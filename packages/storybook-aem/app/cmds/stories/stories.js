const inquirer = require('inquirer');
const fs = require('fs');

const editJsonFile = require("edit-json-file");
const error = require('../../utils/error');
const getDirectories = require('../../utils/getDirectories');
const storyFileDirectory = '../files/stories/'

const storiesTemplate = require('./stories.template');
const contentTemplate = require('./content.template');

inquirer.registerPrompt('fuzzypath', require('inquirer-fuzzy-path'));

module.exports = args => {
    const packageJSON = editJsonFile(`${process.cwd()}/package.json`);
    let name;
    if (Object.entries(packageJSON.data).length === 0) {
        error('No package.json file found. Please run this from the directory with the package.json file for your project', true);
    } else {
        
        const settings = packageJSON.get('storybook-aem');
        const rootPath = `${settings.componentPath}/`;

        if (!settings && !settings.componentPath) {
            error('No storybook-aem settings preset. Please initialize your project by running `storybook-aem init`.', true);
        } else {

            if (args.n || args.name) name = args.name || args.n;
            else {
                inquirer.prompt([
                    {
                        type: 'list',
                        name: 'component',
                        message: 'Generate a Storybook Story for which component?',
                        choices: getDirectories(rootPath).map( component => { return { name: component }})
                    },
                    {
                        type: 'checkbox',
                        name: 'htmlType',
                        message: 'Will your story markup come from AEM? Or will you Manually provide the markup - via JS component or HTML string?',
                        choices: [
                            { name: 'AEM' },
                            { name: 'Manual' },
                            { name: 'Both' }
                        ]
                    },
                    {
                        type: 'input',
                        name: 'stories',
                        message: 'What stories would you like to start with? Add a comma separated list: '
                    }
                ]).then( response => {
                    console.log(`Creating Storybook files for the ${response.component} component`)
                    const componentPath = `${rootPath}${response.component}`;
                    const templateConfig = {
                        ...settings,
                        ...response
                    }

                    storiesTemplate(templateConfig);
                    contentTemplate(templateConfig);

                    // fs.writeFile(`${componentPath}/${response.component}.stories.js`,`Storybook stories, ${settings.jsFramework}, ${response.stories}`, (err) => {
                    //     if (err) throw err;
                    //     console.log(`Created ${componentPath}/${response.component}.stories.js`);
                    // });
                    fs.writeFile(`${componentPath}/${response.component}.stories.mdx`,`Storybook Docs, ${settings.jsFramework}, ${response.stories}`, (err) => {
                        if (err) throw err;
                        console.log(`Created ${componentPath}/${response.component}.stories.mdx`);
                    });
                    fs.writeFile(`${componentPath}/${response.component}.test.js`,`Jest tests, ${settings.jsFramework}, ${response.stories}`, (err) => {
                        if (err) throw err;
                        console.log(`Created ${componentPath}/${response.component}.test.js`);
                    });
                    // fs.writeFile(`${componentPath}/${response.component}.content.js`,`AEM Content JSON, ${settings.jsFramework}, ${response.stories}`, (err) => {
                    //     if (err) throw err;
                    //     console.log(`Created ${componentPath}/${response.component}.content.js`);
                    // });
                    
                })
            }

            // const questions = [
            //     name,
            // ]
            // console.log('settings',settings);
        }
    }
}