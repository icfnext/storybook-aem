const inquirer = require('inquirer');
const { readdirSync } = require('fs')

const getDirectories = source => readdirSync(source, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name)

module.exports = config => {
    const rootPath = `${config.clientlibPath}/`;
    let clientlibs = [];

    const getEntryValue = entry => {
        if (entry.indexOf(',') !== -1) {
            return [ entry.split(',') ];
        } else { return entry }
    }
    const getClientlibName = clientlib => clientlib.split('clientlib-')[1];
    const getClientlibResourcePath = (clientlib,type) => `/etc.clientlibs/${config.namespace}/clientlibs/${clientlib}.${type}`;
    const selectClientLibsQuestion = [
        {
            type: 'list',
            name: 'clientlibs',
            message: 'Select All Clientlibs to be included',
            choices: getDirectories(rootPath).map( clientlib => { return { name: clientlib }})
        }
    ];
    const getClientlibQuestions = clientlibName => {
        const clientlibRootPath = `${rootPath}${clientlibName}/`;

        return [
            {
                type: 'fuzzypath',
                name: 'jsAemPath',
                itemType: 'file',
                depthLimit: 10,
                excludePath: nodePath => {
                    if (nodePath.startsWith('node_modules') || 
                        nodePath.startsWith('.git') || 
                        nodePath.startsWith('.vscode') || 
                        nodePath.startsWith('.settings') || 
                        nodePath === '.DS_Store' ||
                        nodePath.startsWith('.content.xml') || 
                        nodePath.endsWith('.txt') || 
                        nodePath.endsWith('.xml')) return true;
                    else return false;
                },
                rootPath: clientlibRootPath,
                message: 'Please select the main JavaScript file'
            },
            {
                type: 'fuzzypath',
                name: 'cssAemPath',
                itemType: 'file',
                depthLimit: 10,
                excludePath: nodePath => {
                    if (nodePath.startsWith('node_modules') || 
                        nodePath.startsWith('.git') || 
                        nodePath.startsWith('.vscode') || 
                        nodePath.startsWith('.settings') || 
                        nodePath === '.DS_Store' ||
                        nodePath.startsWith('.content.xml') || 
                        nodePath.endsWith('.txt') || 
                        nodePath.endsWith('.xml')) return true;
                    else return false;
                },
                rootPath: clientlibRootPath,
                message: 'Please select the main CSS file'
            },
            {
                type: 'input',
                name: 'entry',
                message: 'What is the name of the webpack entry? A comma-separated list will be converted to an array'
            }
        ];
    }

    const getClientlibConfig = clientlib => {
        
    }

    return inquirer.prompt(selectClientLibsQuestion)
            .then(selectedClientlib => {
                return inquirer.prompt(getClientlibQuestions(selectedClientlib.clientlibs))
                                .then(clientlibResponse => {
                                    return { 
                                        ...config, 
                                        clientlibs: [ 
                                            {
                                                name: getClientlibName(selectedClientlib.clientlibs),
                                                jsResource: getClientlibResourcePath(selectedClientlib.clientlibs,'js'),
                                                cssResource: getClientlibResourcePath(selectedClientlib.clientlibs,'css'),
                                                jsAemPath: clientlibResponse.jsAemPath,
                                                cssAemPath: clientlibResponse.cssAemPath,
                                                entry: getEntryValue(clientlibResponse.entry)
                                            }
                                        ]
                                    }
                                });

            });
}