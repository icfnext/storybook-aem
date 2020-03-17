const path = require('path');
const prompts = require('prompts');

const log = require('../../utils/logger');
const error = require('../../utils/error');
const Install = require('./install');
const Export = require('./export');

const cwd = process.cwd();

module.exports = async args => {
    const packageJSON = require(path.resolve(cwd, 'package.json'));
    
    if (Object.entries(packageJSON).length === 0) {
        error('No package.json file found. Please run this from the directory with the package.json file for your project', true);
    } else {
        if (args._.includes('install')) Install(args,packageJSON);
        if (args._.includes('export')) Export(args,packageJSON);

        // Ask questions to see what they want to do
        const response = await prompts({
            type: 'autocomplete',
            name: 'operation',
            message: [
                'Do you want to install content into AEM from Code?',
                '  Or export content from AEM into the codebase?'
            ].join('\n'),
            choices: [
                { title: 'Install', value: 'install' },
                { title: 'Export', value: 'export' }
            ]
        });
        if (response.operation === 'install') Install(args,packageJSON);
        if (response.operation === 'export') Export(args,packageJSON);
    }
}