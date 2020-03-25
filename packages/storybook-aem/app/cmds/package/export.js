const path = require('path');
const util = require('util');
const exec = util.promisify(require('child_process').exec);
const fs = require('fs');
const unzipper = require('unzipper');
const log = require('../../utils/logger');
const fetchFromAEM = require('../../utils/fetchFromAEM');

const cwd = process.cwd();

module.exports = async (args,config) => {
    try {
        const localPackageDirectory = path.resolve(cwd, config.projectRoot, config.relativeProjectRoot, config.localPackagePath);
        const localPackagePath = path.resolve(localPackageDirectory, config.packageName);
        const packageManagerUrl = `/crx/packmgr/service/.json`;

        let packageUrl = `/etc/packages`;
        if (config.packageGroup) packageUrl += `/${encodeURIComponent(config.packageGroup)}`;
        packageUrl += `/${encodeURIComponent(config.packageName)}`;
        let fullPackageUrl = `http://localhost:4502${packageUrl}`;

        log(`Rebuilding Storybook AEM Library...`);
        await fetchFromAEM({
            url: `${packageManagerUrl}${packageUrl}?cmd=build`,
            method: `POST`
        });

        log(`Exporting Storybook AEM Library...`);
        await exec(`curl -u admin:admin ${fullPackageUrl} -o "${localPackagePath}"`);

        log(`Unzipping new Storybook Library ...`);
        await fs.createReadStream(localPackagePath)
          .pipe(unzipper.Extract({ path: localPackageDirectory }))
          .promise();

        log(`Cleaning up...`);
        await exec(`rm -rf "${localPackagePath}"`);

        log([
            `Storybook AEM Library:\n`,
            `  ${localPackageDirectory}`,
            ``
        ].join('\n'));
    } catch(e) {
        throw log(`There was an error exporting the Storybook AEM Library`, e);
    }
};
