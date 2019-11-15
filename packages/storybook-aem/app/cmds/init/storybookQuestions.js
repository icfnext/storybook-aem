const inquirer = require('inquirer');
const editJsonFile = require('edit-json-file');
const templateAndCopy = require('./templateAndCopy');
const npm = require('npm');

module.exports = config => {
    const questions = [
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
            message: 'Use default story file location - alongside component code?',
            default: true
        },
    ];

    return inquirer.prompt(questions).then(response => { 
        config = { 
            ...config, 
            ...response
        };

        let packages = [
            `@storybook/${config.jsFramework}`,
            `${config.jsFramework}-wrapper-components`,
            '@storybook/addon-a11y',
            '@storybook/addon-backgrounds',
            '@storybook/addon-docs',
            '@storybook/addon-knobs',
            '@storybook/addon-storysource',
            '@storybook/addon-viewport',
            '@storybook/html',
            'http-proxy-middleware'
        ];

        console.log('[storybook-aem] Installing Storybook dependencies');
        npm.load({ loaded: false }, (err) => {
            if (err) throw err;

            npm.commands.install(packages, (installError, data) => {
                if (installError) throw installError;
            });

            npm.on('log', (message) => console.log(message));
        });

        let storybookLocalPath = `${config.uiApps}/.storybook`;
        let storybookAEMPath = `${config.jcrRootPath}/etc/designs/${config.namespace}/storybook`;
        let file = editJsonFile(config.packageJson);

            console.log('[storybook-aem] Updating your package.json with storybook-aem configurations');
            file.set('storybook-aem', config);

            console.log('[storybook-aem] Updating your package.json with storybook scripts');
            file.set('scripts', {
                ...file.get('scripts'),
                'storybook': 'start-storybook -p 4501',
                'build-storybook': `build-storybook -c ${storybookLocalPath} -o ${storybookAEMPath}`
            });
            file.save();

            templateAndCopy(config);

        return config; 
    });            
}