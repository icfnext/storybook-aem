const inquirer = require('inquirer');
const editJsonFile = require('edit-json-file');

module.exports = config => {
    const questions = [
        {
            type: 'fuzzypath',
            name: 'packageJson',
            itemType: 'file',
            depthLimit: 3,
            rootPath: process.cwd(),
            default: `${process.cwd()}/package.json`,
            excludePath: nodePath => {
                if (nodePath.startsWith('node_modules') || 
                    nodePath.startsWith('.git') || 
                    nodePath.startsWith('.vscode') || 
                    nodePath.startsWith('.settings')) return true;
                else return false;
            },
            message: 'Where is your package.json file?'
        },
        {
            type: 'fuzzypath',
            name: 'projectWebpackConfig',
            itemType: 'file',
            depthLimit: 3,
            rootPath: process.cwd(),
            default: `${process.cwd()}/webpack.config.js`,
            excludePath: nodePath => {
                if (nodePath.startsWith('node_modules') || 
                    nodePath.startsWith('.git') || 
                    nodePath.startsWith('.vscode') || 
                    nodePath.startsWith('.settings')) return true;
                else return false;
            },
            message: 'Where is your webpack.config.js file?'
        },
        {
            type: 'fuzzypath',
            name: 'uiApps',
            itemType: 'directory',
            depthLimit: 3,
            rootPath: process.cwd(),
            excludePath: nodePath => {
                if (nodePath.startsWith('node_modules') || 
                    nodePath.startsWith('.git') || 
                    nodePath.startsWith('.vscode') || 
                    nodePath.startsWith('.settings')) return true;
                else return false;
            },
            message: 'Where is your ui.apps folder?'
        },
        {
            type: 'input',
            name: 'namespace',
            rootPath: process.cwd(),
            message: 'What is the project namespace?',
            filter: val => val.toLowerCase()
        }
    ];

    return inquirer.prompt(questions).then(response => { 
        config = { 
            ...config, 
            ...response,
            jcrRootPath: `${response.uiApps}/src/main/content/jcr_root`
        };

        // should get any existing settings instead of overriding 
        let file = editJsonFile(`${config.packageJson}`);
            file.set('storybook-aem', config);
            console.log('[storybook-aem] Updating your package.json with storybook-aem configurations');
            file.save();
            
        return config; 
    });
}