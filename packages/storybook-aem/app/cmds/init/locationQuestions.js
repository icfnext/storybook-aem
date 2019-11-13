const inquirer = require('inquirer');

module.exports = config => {
    const rootPath = `${config.jcrRootPath}apps/${config.namespace}/`;
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
            default: `${rootPath}components/content`,
            message: 'Where is the component folder?'
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
            default: `${rootPath}clientlibs`,
            message: 'Where is the clientlibs folder?'
        }
    ];

    return inquirer.prompt(questions).then(locationAnswers => { 
        return { 
            ...config, 
            componentPath: locationAnswers.componentPath,
            clientlibPath: locationAnswers.clientlibPath,
        }; 
    });
}