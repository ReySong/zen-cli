exports.getPromptModules = () => {
    return [
        "babel",
        "typescript",
        "pwa",
        "router",
        "vuex",
        "pinia",
        "cssPreprocessors",
        // "linter",
        "unit",
        "frameworkVersion"
    ].map(file => require(`../create/config/promptModules/${file}`));
};