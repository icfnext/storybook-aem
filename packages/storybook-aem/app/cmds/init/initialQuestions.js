const inquirer = require('inquirer');

module.exports = config => {
    const questions = [
        {
            type: 'input',
            name: 'namespace',
            message: 'What is the project namespace?',
            filter: val => val.toLowerCase()
        },
        {
            type: 'fuzzypath',
            name: 'packageJson',
            itemType: 'file',
            depthLimit: 3,
            excludePath: nodePath => {
                if (nodePath.startsWith('node_modules') || nodePath.startsWith('.git') || nodePath.startsWith('.vscode') || nodePath.startsWith('.settings')) return true;
                else return false;
            },
            message: 'Where is your package.json file?'
        },
        {
            type: 'fuzzypath',
            name: 'uiApps',
            itemType: 'directory',
            depthLimit: 3,
            excludePath: nodePath => {
                if (nodePath.startsWith('node_modules') || nodePath.startsWith('.git') || nodePath.startsWith('.vscode') || nodePath.startsWith('.settings')) return true;
                else return false;
            },
            message: 'Where is your ui.apps folder?'
        }
    ];

    return inquirer.prompt(questions).then(response => { 
        return { 
            ...config, 
            namespace: response.namespace, 
            packageJson: response.packageJson,
            uiApps: response.uiApps,
            jcrRootPath: `${response.uiApps}/src/main/content/jcr_root/`
        }; 
    });
}