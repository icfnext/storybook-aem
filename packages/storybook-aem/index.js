const minimist = require('minimist');
const error = require('./app/utils/error');

module.exports = () => {
    const args = minimist(process.argv.slice(2));
    const cmd = args._[0]

    switch(cmd) {
        case 'init':
            require('./app/cmds/init/init')(args);
            break;
        case 'component':
            require('./app/cmds/component/component')(args);
            break;
        case 'story':
        case 'stories':
            require('./app/cmds/stories/stories')(args);
            break;
        case 'content':
            require('./app/cmds/content')(args);
            break;
        case 'v':
        case 'version':
            require('./app/cmds/version')(args);
            break;
        case 'help':
            require('./app/cmds/help')(args);
            break;
        default:
            error(`"${cmd}" is not a valid command. Try "storybook-aem help for assistance.`, true);
            break;
    }
}