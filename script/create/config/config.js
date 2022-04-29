const inquirer = require("inquirer");
const EventEmitter = require("events");

const { presetChoices, savedTemplates } = require("./preset");
const PromptModuleAPI = require("../promptModuleAPI");

class Creator extends EventEmitter {
    constructor(name, PromptModules) {
        super();
        this.name = name;
        this.options = {};
        const { presetPrompt } = this.promptPreset();
        const { featurePrompt } = this.promptManual();
        this.presetPrompt = presetPrompt;
        this.featurePrompt = featurePrompt;
        this.resolvePrompts();

        const promptAPI = new PromptModuleAPI(this);
        // PromptModules.forEach(m => m(promptAPI));
    }

    create() {}

    promptPreset() {
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

    promptManual() {
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

    async resolvePrompts() {
        const { preset } = await inquirer.prompt([this.presetPrompt]);
        console.log(preset);
        this.options.presetOption = preset;
        if (preset !== "__manual__") {
            this.options.presetOption = savedTemplates.get(preset);
            return;
        }
        const { feature } = await inquirer.prompt([this.featurePrompt]);
        this.options.featureOption = feature;
    }
}

module.exports = function config(...args) {
    const creator = new Creator(...args);
    return creator.create();
};