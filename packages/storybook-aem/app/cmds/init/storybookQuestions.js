const inquirer = require('inquirer');
const editJsonFile = require('edit-json-file');
const templateAndCopy = require('./templateAndCopy');

module.exports = answers => {
    return [
        {
            type: 'rawlist',
            name: 'jsFramework',
            message: 'Select your JS Framework?',
            choices: ['React','PReact'],
            filter: val => val.toLowerCase()
        },
        {
            type: 'confirm',
            name: 'useDefaultStorybookLocation',
            message: 'Use default storybook file location? e.g. [your-project-name]-ui.apps/.storybook/',
            default: true
        },
        {
            type: 'confirm',
            name: 'useDefaultStoryLocation',
            message: 'Use default story file location - alongside component code',
            default: true
        },
    ]

    let file = editJsonFile(`./${config.packageJson}`);
            file.set('storybook-aem', config);
            file.set('scripts', {
                ...file.get('scripts'),
                'storybook': 'start-storybook -p 4501',
                'build-storybook': `build-storybook -c ./${config.uiApps}/.storybook -o ./${config.jcrRootPath}/etc/designs/${config.namespace}/storybook`
            });
            file.save();

            templateAndCopy(config);
}