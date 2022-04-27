const inquirer = require("inquirer");
const EventEmitter = require("events");

const { presetChoices, savedTemplates } = require("./promptModules/preset");

class Creator extends EventEmitter {
    options = {};
    constructor(name) {
        super();
        this.name = name;
        this.options = {};
        const { presetPrompt } = this.resolvePreset();
        this.presetPrompt = presetPrompt;
        this.resolvePrompts();
    }

    create() {}

    resolvePreset() {
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

    async resolvePrompts() {
        const { preset } = await inquirer.prompt([this.presetPrompt]);
        this.options.presetOption = preset;
        if (preset !== "__manual__") {
            this.option = savedTemplates.get(preset);
            return;
        }
    }
}

module.exports = function config(...args) {
    const creator = new Creator(...args);
    return creator.create();
};