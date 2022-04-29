exports.getPromptModules = () => {
    return ["frameworkVersion"].map(file =>
        require(`../create/config/promptModules/${file}`)
    );
};