const ncp = require('ncp').ncp;
const source = `${__dirname}/../../../storybook/.storybook`;

module.exports = config => {
    ncp.limit = 16;
    
    ncp(source, `${config.uiApps}/.storybook`, (err) => {
        if (err) return console.error(err);
        console.log(`Storybook Files Copied to ui.apps folder: ${config.uiApps}/.storybook`);
    });
}
