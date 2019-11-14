const inquirer = require('inquirer');
const editJsonFile = require('edit-json-file');

module.exports = config => {
    const rootPath = `${config.jcrRootPath}/apps/${config.namespace}`;
    const questions = [
        {
            type: 'fuzzypath',
            name: 'componentPath',
            itemType: 'directory',
            depthLimit: 3,
            excludePath: nodePath => {
                if (nodePath.startsWith('node_modules') || 
                    nodePath.startsWith('.git') || 
                    nodePath.startsWith('.vscode') || 
                    nodePath.startsWith('.settings')) return true;
                else return false;
            },
            rootPath: rootPath,
            default: `${rootPath}/components/content`,
            message: 'Where is the AEM components folder?'
        },
        {
            type: 'fuzzypath',
            name: 'clientlibPath',
            itemType: 'directory',
            depthLimit: 3,
            excludePath: nodePath => {
                if (nodePath.startsWith('node_modules') || 
                    nodePath.startsWith('.git') || 
                    nodePath.startsWith('.vscode') || 
                    nodePath.startsWith('.settings')) return true;
                else return false;
            },
            rootPath: rootPath,
            default: `${rootPath}/clientlibs`,
            message: 'Where is the AEM clientlibs folder?'
        }
    ];

    return inquirer.prompt(questions).then(response => { 
        config = { 
            ...config, 
            componentPath: response.componentPath,
            clientlibPath: response.clientlibPath,
        };
        
        let file = editJsonFile(config.packageJson);
            file.set('storybook-aem', config);
            file.save();

        return config; 
    });
}