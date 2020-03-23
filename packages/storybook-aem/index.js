const minimist = require('minimist');
const chalk = require('chalk');
const error = require('./app/utils/error');
const log = require('./app/utils/logger');

module.exports = () => {
    const args = process.argv.slice(2);
    const cmd = args[0];

    switch(cmd) {
        case 'init':
            require('./app/cmds/init/init')(args);
            break;
        case 'component':
            require('./app/cmds/component/component')(args);
            break;
        case 'story':
        case 'stories':
            require('./app/cmds/stories/story')(args);
            break;
        case 'content':
            require('./app/cmds/content')(args);
            break;
        case 'package':
            require('./app/cmds/package')(args);
            break;
        case 'v':
        case 'version':
            require('./app/cmds/version')(args);
            break;
        case 'help':
            require('./app/cmds/help')(args);
            break;
        default:
            log([
                `${chalk.italic(cmd)} is not a valid command.`,
                ``,
                `Usage: ${chalk.italic('storybook-aem <command>')}`,
                ``,
                `Where <command> is on of:`,
                `  init, help, story, version`,
                ``
            ].join('\n'));
            break;
    }
}