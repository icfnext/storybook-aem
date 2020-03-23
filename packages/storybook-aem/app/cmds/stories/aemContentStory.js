const path = require('path');
const prompts = require('prompts');
const chalk = require('chalk');

const toCamelCase = require('../../utils/toCamelCase');
const toTitleCase = require('../../utils/toTitleCase');

module.exports = async (config,storyDefinition) => {
    storyDefinition = {
        ...storyDefinition,
        ...await prompts([
            {
                type: 'confirm',
                name: 'existingContentPath',
                message: `Use an existing Content Path?`,
                initial: false
            },
            {
                type: existingContentPath => existingContentPath ? 'text' : null,
                name: 'contentPath',
                message: `Please add the Existing AEM Content Path:`
            },
            {
                type: (prev,answers) => {
                    if (answers.hasOwnProperty('contentPath') && !answers.contentPath.includes(config.aemContentPath)) {
                        return 'confirm'
                    } else {
                        return null
                    }
                },
                name: 'duplicate',
                message: [
                    `The provided content path is not part of the Storybook Library`,
                    `  Would you like to copy it to the Storybook Library?`
                ].join('\n'),
                initial: true
            },
            {
                type: (prev, answers) => answers.contentPath ? null : 'confirm',
                name: 'createAEMContent',
                message: `Create content in AEM for this story?`,
                initial: true
            }
        ])
    };

    if (storyDefinition.hasOwnProperty('createAEMContent') && storyDefinition.createAEMContent) {
        storyDefinition.contentPath = `${config.aemContentPath}/${config.component}/jcr:content${config.aemContentDefaultPageContentPath}/${storyDefinition.name}`;
    }

    return storyDefinition;
}