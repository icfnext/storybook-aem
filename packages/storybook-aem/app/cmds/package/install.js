const fs = require('fs');
const path = require('path');
const FormData = require('form-data');

const cwd = process.cwd();
const log = require('../../utils/logger');
const fetchFromAEM = require('../../utils/fetchFromAEM');

module.exports = async (args,config) => {
    log(`Checking for Storybook Content Package configuration...`);
    const packageManagerURL = `/crx/packmgr/service.jsp`;
    const storybookPackagePath = path.resolve(cwd, config.projectRoot, config.relativeProjectRoot, config.localPackagePath, config.packageName);
    if (!fs.existsSync(storybookPackagePath)) throw log(chalk.red(`error, could not find Storybook Content Package`));

    const form = new FormData();
    form.append('file', fs.createReadStream(storybookPackagePath));
    form.append('name', `/packages/` + config.packageName);
    form.append('force', 'true');
    form.append('install', 'true');

    log(`Attempting to create Storybook Content Package in AEM...`);
    await fetchFromAEM({
        url: packageManagerURL,
        method: 'POST',
        body: form
    });
    log(`Storybook Content Package successfully created in AEM!`);
    log(`You can see the AEM Content here: http://localhost:4502/sites.html${config.aemContentPath}`);
};