const editJsonFile = require("edit-json-file");

const initialQuestions = require('./initialQuestions');
const locationQuestions = require('./locationQuestions');
const clientlibQuestions = require('./clientlibQuestions');

const inquirer = require('inquirer');
inquirer.registerPrompt('fuzzypath', require('inquirer-fuzzy-path'));

module.exports = args => {
    let answers = {};

    initialQuestions(answers)
        .then(initialAnswers => locationQuestions(initialAnswers))
        .then(locationAnswers => clientlibQuestions(locationAnswers))
        .then(config => {
            let file = editJsonFile(`./${config.packageJson}`);
            file.set('storybook-aem', config);
            file.save();
        });
}