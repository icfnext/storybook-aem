const path = require('path');
const prompts = require('prompts');

const error = require('../../utils/error');
const getDirectories = require('../../utils/getDirectories');
const toCamelCase = require('../../utils/toCamelCase');
const toTitleCase = require('../../utils/toTitleCase');
const getEditDialog = require('../../utils/getEditDialog');

const defineStory = require('./defineStory');
const storiesTemplate = require('./templates/stories');
const createContentFromStories = require('../content/contentFromStories');

const cwd = process.cwd();

module.exports = async args => {
    const packageJSON = require(path.resolve(cwd, 'package.json'));
    
    if (Object.entries(packageJSON).length === 0) {
        error('No package.json file found. Please run this from the directory with the package.json file for your project', true);
    } else {

        let config = packageJSON['storybook-aem'];
        const componentBasePath = path.resolve(cwd, config.projectRoot, config.relativeProjectRoot, config.componentPath );
        let componentType = await prompts([
            {
                type: 'autocomplete',
                name: 'componentType',
                message: 'Generate a Story for which component type?',
                choices: getDirectories(componentBasePath).map( component => { return { title: component, value: component }})
            },
            {
                type: 'autocomplete',
                name: 'component',
                message: 'Generate a Storybook Story for which component?',
                limit: 20,
                choices: componentType => getDirectories(path.resolve(componentBasePath,componentType))
                    .map( component => ({ title: component, value: component }))
            }
        ]);

        config = { ...config, ...componentType };

        let addStory = true;
        let stories = [];
        while (addStory) {
            let story = await defineStory(config);
            stories.push(story);
            if (!story.more) addStory = false;
        }

                    //     {
                    //         type
                    //     }
                        // {
                        //     type: story => !story ? null : 'confirm',
                        //     name: 'createAEMContent',
                        //     message: `Create content in AEM for the stories you've listed?`,
                        //     initial: true
                        // },
                    // ]);
        //     {
        //         type: (prev,values) => values.hasOwnProperty('stories') && !config.aemContentPath ? 'text' : null,
        //         name: 'aemContentPath',
        //         message: `Where do you want your Storybook Content to live in AEM?`,
        //         initial: `/content/${config.namespace}/en/Storybook-Content`
        //     },
        //     {
        //         type: (prev,values) => values.hasOwnProperty('stories') && !config.aemContentDefaultPageResourceType ? 'text' : null,
        //         name: 'aemContentDefaultPageResourceType',
        //         message: `What is the default Page Resource Type for the project?`,
        //         initial: `${config.namespace}/components/structure/page`
        //     },
        //     {
        //         type: (prev,values) => values.hasOwnProperty('stories') && !config.aemContentDefaultPageTemplate ? 'text' : null,
        //         name: 'aemContentDefaultPageTemplate',
        //         message: `What is the path to the Page Template you want to use as the default?`,
        //         initial: `/conf/${config.namespace}/settings/wcm/templates/[your-default-page-template]`
        //     },
        //     {
        //         type: (prev,values) => values.hasOwnProperty('stories') && !config.aemContentDefaultPageContentPath ? 'text' : null,
        //         name: 'aemContentDefaultPageContentPath',
        //         message: [
        //             `What is the path Content Path in the Default Page Template where content lives?`,
        //             ` Check out http://localhost:4502/crx/de/index.jsp#/conf/${config.namespace}/settings/wcm/template-types/`,
        //             `  and look at the children '/[template-name]/jcr:content/' `,
        //             ` This value starts at the first child of 'jcr:root'.`,
        //             ` An example might be:`,
        //             ` /root/regioncontainer-main/responsivegrid`
        //         ].join('\n')
        //     },
        //     {
        //         type: (prev,values) => values.hasOwnProperty('stories') && !config.aemStoryHeadingComponentResourceType ? 'text' : null,
        //         name: 'aemStoryHeadingComponentResourceType',
        //         message: [
        //             `We identify stories using a Heading/Text component per story.`,
        //             ` What is the Resource Type you would like to use for the Heading/Text to identify stories?`
        //         ].join('\n'),
        //         initial: `${config.namespace}/components/content/[component-name]`
        //     },
        //     {
        //         type: (prev,values) => values.hasOwnProperty('stories') && !config.aemStoryHeadingComponentTitleProperty ? 'text' : null,
        //         name: 'aemStoryHeadingComponentTitleProperty',
        //         message: `What is the Title Property of the Heading/Text Component used to denote your stories?`,
        //         initial: `jcr:title`
        //     }
        // ]);


        config = { 
            ...config, 
            stories,
            createAEMContent: stories.filter(story => story.createAEMContent || story.duplicate).length > 0
        };

        /*
        "aemContentPath": "/content/uhcdotcom/en/pattern-library",
        "aemContentDefaultPageResourceType": "uhcdotcom/components/structure/page",
        "aemContentDefaultPageTemplate": "/conf/uhcdotcom/settings/wcm/templates/content-page-with-left-nav",
        "aemContentDefaultPageContentPath": "/root/regioncontainer-main/responsivegrid",
        "aemStoryHeadingComponentResourceType": "uhcdotcom/components/content/heading",
        "aemStoryHeadingComponentTitleProperty": "jcr:title",
        "storyRoot": "Components"
        */

        
        // let editDialog = getEditDialog(config);
        // console.log('editDialog:', editDialog)

        storiesTemplate(config);
        createContentFromStories(config);
    }
}