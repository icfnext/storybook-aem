const fs = require('fs');
const path = require('path');
const prompts = require('prompts');

const error = require('../../utils/error');
const getDirectories = require('../../utils/getDirectories');
const toCamelCase = require('../../utils/toCamelCase');
const getEditDialog = require('../../utils/getEditDialog');

const storiesTemplate = require('./templates/stories');
const contentTemplate = require('./templates/content');
const createContentFromStories = require('../content/contentFromStories');

const cwd = process.cwd();

module.exports = async args => {
    console.log('local story dev');
    const packageJSON = require(path.resolve(cwd, 'package.json'));
    
    if (Object.entries(packageJSON).length === 0) {
        error('No package.json file found. Please run this from the directory with the package.json file for your project', true);
    } else {

        let config = packageJSON['storybook-aem'];
        let storyConfig = {};

        const componentBasePath = path.resolve(cwd, config.projectRoot, config.relativeProjectRoot, config.componentPath );
        const componentType = await prompts([
            {
                type: 'select',
                name: 'componentType',
                message: 'Generate a Story for which component type?',
                choices: getDirectories(componentBasePath).map( component => { return { title: component, value: component }})
            }
        ]);
        storyConfig = { ...storyConfig, ...componentType };

        const componentPath = path.resolve(cwd, config.projectRoot, config.relativeProjectRoot, config.componentPath, componentType.componentType );
        const componentConfig = await prompts([
            {
                type: 'select',
                name: 'component',
                message: 'Generate a Storybook Story for which component?',
                choices: getDirectories(componentPath).map( component => { return { title: component, value: component }})
            },
            {
                type: 'list',
                name: 'stories',
                message: 'In addition to the default empty story, add a comma separated list of stories would you like to start with:',
                separator: ',',
                format: res => {
                    if (!res.length) return false;
                    // else return res.map( story => toCamelCase(story));
                    else return res;
                }
            }
        ]);
        // Add the empty story
        if (componentConfig.stories.length === 1 && componentConfig.stories[0] === ''){
            componentConfig.stories[0] = 'empty';
        } else {
            componentConfig.stories.unshift('empty');
        }

        storyConfig = { ...storyConfig, ...componentConfig };

        if (storyConfig.stories.length && config.aemContentPath) {
            storyConfig.createAEMContent = await(prompts({
                type: 'confirm',
                name: 'createAEMContent',
                message: `Create content in AEM for the stories you've listed?` ,
                initial: true,
                format: res => res
            }));

            storyConfig.stories = storyConfig.stories.map( story => {
                let contentPath = false;
                if (storyConfig.createAEMContent) {
                    contentPath = `${config.aemContentPath}/${storyConfig.component}/jcr:content${config.aemContentDefaultPageContentPath}/${story}`;
                }
    
                return {
                    name: toCamelCase(story),
                    displayName: story,
                    contentPath: contentPath
                };
            });
        }

        // if (storyConfig.stories.length) { 
        //     contentPathConfig= await prompts(storyConfig.stories.map( story => {
        //         return {
        //             type: 'text',
        //             name: story,
        //             message: `What is the content path for the -  ${story}  - story?\n    -> Leave blank if you don't have the path\n    -> Content Path must be a path from the AEM JCR starting with /content/ and cannot end with .html`,
        //             format: res => {
        //                 if (res !== '') return `http://localhost:4502${res}.html?wcmmode=disabled`;
        //                 else return false
        //             },
        //             validate: res => {
        //                 if (res === '' || (res.startsWith('/content/')) && !res.endsWith('.html')) return true;
        //                 else return 'Content Path must be a path from the AEM JCR starting with /content/ and cannot end with .html';
        //             }
        //         }
        //     }));
        // }

        

        config = { ...config, ...storyConfig };

        // let editDialog = getEditDialog(config);
        // console.log('editDialog:', editDialog)

        storiesTemplate(config);
        createContentFromStories(config);
    }
}