module.exports = cli => {
    cli.injectFeature({
        name: 'Progressive Web App (PWA) Support',
        value: 'pwa',
        short: 'PWA',
        description: 'Improve performances with features like Web manifest and Service workers',
    })

    cli.onPromptComplete((answers, options) => {
        if (answers.features.includes('pwa')) {
            options.plugins['@zen/cli-plugin-pwa'] = {}
        }
    })
}