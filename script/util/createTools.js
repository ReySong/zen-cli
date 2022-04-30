exports.getPromptModules = () => {
    return [
        "babel",
        "typescript",
        "pwa",
        "router",
        "vuex",
        "cssPreprocessors",
        // "linter",
        "unit",
        "frameworkVersion"
    ].map(file => require(`../create/config/promptModules/${file}`));
};