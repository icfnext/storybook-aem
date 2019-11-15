const ncp = require('ncp').ncp;
const source = `${__dirname}/../../../storybook/.storybook`;

module.exports = config => {
    ncp.limit = 16;

    console.log(`[storybook-aem] Copying storybook files to ${config.uiApps}/.storybook`);
    
    ncp(source, `${config.uiApps}/.storybook`, (err) => {
        if (err) return console.error(err);
        console.log(`[storybook-aem] Storybook Files Copied to ui.apps folder: ${config.uiApps}/.storybook`);
    });
}
