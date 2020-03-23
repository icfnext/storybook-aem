const path = require('path');
const prompts = require('prompts');
const chalk = require('chalk');

const toCamelCase = require('../../utils/toCamelCase');
const toTitleCase = require('../../utils/toTitleCase');
const aemContentStory = require('./aemContentStory');
const htlEngineStory = require('./htlEngineStory');

module.exports = async (config) => {
    let storyDefinition = await prompts([
        {
            type: 'text',
            name: 'displayName',
            message: 'What is this story called?',
            format: res => !res.length ? false : toTitleCase(res)
        },
        {
            type: displayName => !displayName ? null : 'autocomplete',
            name: 'type',
            message: `Use HTL Engine to template your content? Or fetch content from AEM?`,
            choices: [
                { title: 'AEM Content', value: 'aemContent' },
                { title: 'HTL Engine', value: 'htlEngine' },
            ]
        },
    ]);

    storyDefinition.name = toCamelCase(storyDefinition.displayName);

    let moreQuestions = storyDefinition.type === 'aemContent' ? aemContentStory : htlEngineStory;
    storyDefinition = {
        ...storyDefinition,
        ...await moreQuestions(config,storyDefinition)
    }

    // Ask if they want to add more stories
    storyDefinition = {
        ...storyDefinition,
        ...await prompts([
            {
                type: 'confirm',
                name: 'more',
                message: `Would you like to add another story?`,
                initial: false
            }
        ])
    };

    return storyDefinition;
};