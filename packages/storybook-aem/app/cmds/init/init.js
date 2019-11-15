const editJsonFile = require("edit-json-file");

const initialQuestions = require('./initialQuestions');
const locationQuestions = require('./locationQuestions');
const clientlibQuestions = require('./clientlibQuestions');
const storybookQuestions = require('./storybookQuestions');
const templateAndCopy = require('./templateAndCopy');

const inquirer = require('inquirer');
inquirer.registerPrompt('fuzzypath', require('inquirer-fuzzy-path'));

module.exports = args => {
    let answers = {};

    initialQuestions(answers)
        .then(initialAnswers => locationQuestions(initialAnswers))
        .then(locationAnswers => clientlibQuestions(locationAnswers))
        .then(clientlibAnswers => storybookQuestions(clientlibAnswers));
}