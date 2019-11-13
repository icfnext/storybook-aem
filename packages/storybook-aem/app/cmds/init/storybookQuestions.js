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
}