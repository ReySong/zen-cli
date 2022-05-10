const inquirer = require("inquirer");
const EventEmitter = require("events");
const debug = require("debug");

const { presetChoices, savedTemplates } = require("./preset");
const PromptModuleAPI = require("../promptModuleAPI");

const isManualMode = answers => answers.preset === "__manual__";

module.exports = class Creator extends EventEmitter {
    constructor(name, PromptModules) {
        super();
        this.name = name;
        this.options = {
            framework: "vue"
        };
        const { presetPrompt } = this.resolvePresetPrompt();
        const { featurePrompt } = this.resolveManualPrompt();
        this.presetPrompt = presetPrompt;
        this.featurePrompt = featurePrompt;
        this.injectedPrompts = [];
        this.promptCompleteCbs = [];

        const promptAPI = new PromptModuleAPI(this);
        PromptModules.forEach(m => m(promptAPI));

        this.resolvePresetOrPrompts();
    }

    create(cliOptions = {}, options = null) {}

    resolvePresetPrompt() {
        const presetPrompt = {
            name: "preset",
            type: "list",
            message: `Please pick a preset`,
            choices: [
                ...presetChoices,
                {
                    name: "Manually select features",
                    value: "__manual__"
                }
            ]
        };

        return {
            presetPrompt
        };
    }

    resolveManualPrompt() {
        const featurePrompt = {
            name: "features",
            type: "checkbox",
            message: "Check the features needed for your project:",
            choices: [],
            pageSize: 10
        };

        return {
            featurePrompt
        };
    }

    resolvePreset() {}

    resolveFinalPrompts() {
        // patch generator-injected prompts to only show in manual mode
        this.injectedPrompts.forEach(prompt => {
            const originalWhen = prompt.when || (() => true);
            prompt.when = answers => {
                return isManualMode(answers) && originalWhen(answers);
            };
        });

        const prompts = [
            this.presetPrompt,
            this.featurePrompt,
            ...this.injectedPrompts
            // ...this.outroPrompts
        ];
        debug("zen-cli:prompts")(prompts);
        return prompts;
    }

    async resolvePresetOrPrompts(answers = null) {
        if (!answers) {
            console.clear();
            answers = await inquirer.prompt(this.resolveFinalPrompts());
        }
        debug("zen-cli:answers")(answers);
    }
};