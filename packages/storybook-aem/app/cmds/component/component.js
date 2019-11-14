const inquirer = require('inquirer');
const editJsonFile = require("edit-json-file");
const error = require('../../utils/error');

inquirer.registerPrompt('fuzzypath', require('inquirer-fuzzy-path'));

module.exports = args => {
    const packageJSON = editJsonFile(`${process.cwd()}/package.json`);

    if (Object.entries(packageJSON.data).length === 0) {
        error('No package.json file found. Please run this from the directory with the package.json file for your project', true);
    } else {
        
        let settings = packageJSON.get('storybook-aem');
        if (!settings) {
            error('No storybook-aem settings preset. Please initialize your project by running `storybook-aem init`.', true);
        } else {

            const questions = [
                name,
            ]
            console.log('settings',settings);
        }
    }
}