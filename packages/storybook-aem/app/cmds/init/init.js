const editJsonFile = require("edit-json-file");

const initialQuestions = require('./initialQuestions');
const locationQuestions = require('./locationQuestions');
const clientlibQuestions = require('./clientlibQuestions');
const templateAndCopy = require('./templateAndCopy');

const inquirer = require('inquirer');
inquirer.registerPrompt('fuzzypath', require('inquirer-fuzzy-path'));

module.exports = args => {
    let answers = {};

    initialQuestions(answers)
        .then(initialAnswers => locationQuestions(initialAnswers))
        .then(locationAnswers => clientlibQuestions(locationAnswers))
        .then(config => {
            // let file = editJsonFile(config.packageJson);
            // file.set('storybook-aem', config);
            // file.set('scripts', {
            //     ...file.get('scripts'),
            //     'storybook': 'start-storybook -p 4501',
            //     'build-storybook': `build-storybook -c ./${config.uiApps}/.storybook -o ./${config.jcrRootPath}/etc/designs/${config.namespace}/storybook`
            // });
            // file.save();

            templateAndCopy(config);
        });
}