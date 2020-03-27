const fs = require('fs');
const path = require('path');
const FormData = require('form-data');
const util = require('util');
const exec = util.promisify(require('child_process').exec);
const chalk = require('chalk');
const cwd = process.cwd();
const log = require('../../utils/logger');
const fetchFromAEM = require('../../utils/fetchFromAEM');

module.exports = async (args,config) => {
    const packageManagerURL = `/crx/packmgr/service.jsp`;
    const currentDirectory = path.resolve(cwd);
    const storybookPackageDirectory = path.relative(
        cwd, 
        path.resolve(
            config.projectRoot, 
            config.relativeProjectRoot, 
            config.localPackagePath
        )
    );
    const storybookPackagePath = path.relative(
        cwd,
        path.resolve(
            config.projectRoot, 
            config.relativeProjectRoot, 
            config.localPackagePath,
            config.packageName
        )
    );

    try {
        log(`Zipping Storybook library ...`);
        await exec(`cd ${storybookPackageDirectory} && zip -r "${config.packageName}" . && cd ${currentDirectory}`);

        log(`Checking for Storybook AEM Content Package...`);
        if (!fs.existsSync(storybookPackagePath)) {
            throw log(chalk.red(`error, could not find Storybook AEM Content Package`));
        }

        const form = new FormData();
        form.append('file', fs.createReadStream(storybookPackagePath));
        form.append('name', `/packages/` + encodeURIComponent(config.packageName));
        form.append('force', 'true');
        form.append('install', 'true');

        log(`Installing Storybook AEM Content Package to AEM...`);
        await fetchFromAEM({
            url: packageManagerURL,
            method: 'POST',
            body: form
        });

        log(`Cleaning up...`);
        await exec(`rm -rf "${storybookPackagePath}"`);

        log([
            `You can see the Storybook AEM Content here:\n`,
            `  http://localhost:4502/sites.html${config.aemContentPath}\n`
        ].join('\n'));

        if (!args.includes('--quiet')) {
            exec(`open http://localhost:4502/sites.html${config.aemContentPath}`);
        }
    } catch (e) {
        throw log("There was an error installing the content package", chalk.red(e));
    }
};
