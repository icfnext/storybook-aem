const minimist = require('minimist');
const error = require('./utils/error');

module.exports = () => {
    const args = minimist(process.argv.slice(2));
    const cmd = args._[0]

    switch(cmd) {
        case 'init':
            require('./cmds/init')(args);
            break;
        case 'component':
            require('./cmds/component')(args);
            break;
        case 'content':
            require('./cmds/content')(args);
            break;
        case 'v':
        case 'version':
            require('./cmds/version')(args);
            break;
        case 'help':
            require('./cmds/help')(args);
            break;
        default:
            error(`"${cmd}" is not a valid command. Try "storybook-aem help for assistance.`, true);
            break;
    }
}