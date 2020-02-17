const prompts = require('prompts');

module.exports = async (args,config) => {
    const questions = [
        {
            type: 'toggle',
            name: 'storybookAEMStyleSystem',
            message: `Would you like to use the optional AEM Style System package?`,
            initial: false,
            active: 'Yes',
            inactive: 'No'
        }, {
            type: 'toggle',
            name: 'storybookAEMGrid',
            message: `Would you like to use the optional AEM Grid package?`,
            initial: false,
            active: 'Yes',
            inactive: 'No'
        }, {
            type: 'toggle',
            name: 'storybookAEMPageTemplate',
            message: `Would you like to use the optional AEM Page Template package?`,
            initial: false,
            active: 'Yes',
            inactive: 'No'
        }, {
            type: 'toggle',
            name: 'storybookAEMConfluence',
            message: `Would you like to use the optional Confluence package?`,
            initial: false,
            active: 'Yes',
            inactive: 'No'
        },
    ];

    config = { ...config, ... await prompts(questions) };

    // If any package is selected that requires the core bundle then storybookAEMCore should be true.
    config.storybookAEMFoundation = config.storybookAEMConfluence;

    if (config.storybookAEMFoundation) {
        const aemCoreQuestion = [
            {
                type: 'number',
                name: 'storybookAEMPort',
                message: `You have selected a package that requires the AEM Core package. We need to install an AEM bundle to enable these features. What port is AEM Author running on?`,
                initial: '4502'
            }
        ]
        config = { ...config, ... await prompts(aemCoreQuestion) };
    }

    return config;
}
