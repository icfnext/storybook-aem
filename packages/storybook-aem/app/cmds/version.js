const npm = require('npm');
const chalk = require('chalk');

const { version } = require('../../package.json');
const log = require('../utils/logger');

module.exports = (args) => {
    npm.load({ loaded: false }, (err) => {
        if (err) throw err;
        
        npm.commands.view(['storybook-aem'],true,(a,json,c) => {
            let latest = Object.keys(json)[0];
            let color = latest >= version ? chalk.green : chalk.red;
            log(`Latest:    v${Object.keys(json)[0]}`);
            log(color(`Installed: v${version}`));
        });
    });
}