const chalk = require("chalk");

const presetChoices = new Set();
const savedTemplates = new Map();

presetChoices.add({
    name: "Default (Vue 3, ts)",
    value: "default-vue3"
});
savedTemplates.set("default-vue3", {});

presetChoices.add({
    name: "Default (Vue 2, js)",
    value: "default-vue2"
});
savedTemplates.set("default-vue2", {});

exports.createPreset = function(name, options) {
    if (presetChoices[name]) {
        console.error(
            chalk.red(
                `Preset named ${name} already exists, pleace choose another name!`
            )
        );
        return -1;
    }
    presetChoices.add({
        name: name,
        value: `__${name}__`
    });
    savedTemplates.set(presetChoices[name], options);
};

exports.presetChoices = presetChoices;
exports.savedTemplates = savedTemplates;