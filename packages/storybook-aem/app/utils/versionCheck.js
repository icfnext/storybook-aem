const npm = require('npm');
const chalk = require('chalk');
const boxen = require('boxen');

const { version } = require('../../package.json');

const getLatestVersion = async (callback) => {
    return await npm.load({ loaded: false }, async (err) => {
        if (err) throw err;

        return await npm.commands.view(['storybook-aem'],true,(param,json) => {
            if (callback) callback(Object.keys(json)[0])
            return Object.keys(json)[0];
        })
    });
}

const getInstalledVersion = () => version;

async function checkVersion() {
    const installed = getInstalledVersion();
    getLatestVersion(latest => {
        if (latest > installed) {
            const message = `There's a ${chalk.green(`new version`)} of ${chalk.rgb(255, 71, 133).bold('storybook-aem')}!`;
            const latestMessage = `${chalk.green(`Latest: v${latest}`)}`;
            const installedMessage = `${chalk.red(`Installed: v${installed}`)}`;
            const updateWith = chalk.bold.dim('Update with either:');
            console.log(
                boxen([
                    `${message}`,
                    ``,
                    `  ${latestMessage} ${chalk.dim('-')} ${installedMessage}`,
                    `  `,
                    ``,
                    `          ${updateWith}`,
                    `      npm update -g storybook-aem`,
                    `                 ${chalk.dim('or')}`,
                    `   yarn global upgrade storybook-aem`,
                ].join('\n'), { padding: 1, margin: 1, borderColor: '#F1618C', borderStyle: 'round' })
            );
        }
    });
}

module.exports = { getLatestVersion, getInstalledVersion, checkVersion }