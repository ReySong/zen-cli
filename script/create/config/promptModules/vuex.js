module.exports = cli => {
    if (cli.creator.options.framework === "vue") {
        cli.injectFeature({
            name: "Vuex",
            value: "vuex",
            description: "Manage the app state with a centralized store",
            link: "https://vuex.vuejs.org/"
        });

        cli.onPromptComplete((answers, options) => {
            if (answers.features.includes("vuex")) {
                options.plugins["@zen/cli-plugin-vuex"] = {};
            }
        });
    }
};