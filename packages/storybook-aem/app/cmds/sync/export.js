const fs = require('fs');
const path = require('path');
const prompts = require('prompts');

const log = require('../../utils/logger');
const fetchFromAEM = require('../../utils/fetchFromAEM');
const error = require('../../utils/error');
const getDirectories = require('../../utils/getDirectories');
const toCamelCase = require('../../utils/toCamelCase');
const getEditDialog = require('../../utils/getEditDialog');

const cwd = process.cwd();

module.exports = async args => {
    log(`Running AEM Sync Export process...`);
    const packageJSON = require(path.resolve(cwd, 'package.json'));
    
    if (Object.entries(packageJSON).length === 0) {
        error('No package.json file found. Please run this from the directory with the package.json file for your project', true);
    } else {

        const config = packageJSON['storybook-aem'];
        if (!config.hasOwnProperty('contentSyncLocation')) {
            throw(`No 'contentSyncLocation' in package.json`);
        }
        const contentFolder = path.resolve(process.cwd(), config.projectRoot, config.relativeProjectRoot, config.contentSyncLocation);
        if (!fs.existsSync(contentFolder)) fs.mkdirSync(contentFolder);

        const response = await fetchFromAEM({
            url: `${config.aemContentPath}.infinity.json`,
            errorMessage: 'Error Exporting Content:'
        });

        if (await response.ok) {
            log(`Successfully connected to AEM!`)
            const json = await response.json();
            const keys = Object.keys(json);
            if (keys.length) {
                log(`Syncing content from AEM into your codebase...`);
                const rootJSON = {};

                // Loop through all the data returned, and make files for each aem page 
                keys.forEach(key => {
                    if (json[key].hasOwnProperty('jcr:primaryType') && json[key]['jcr:primaryType'] === 'cq:Page') {
                        fs.writeFile(`${contentFolder}/${key}.content.json`, JSON.stringify(json[key], null, 4), (err) => {
                            if (err) throw err;
                            log(`Created file from AEM Page: ${key}`);
                        });
                    } else if (key.includes('jcr:')) rootJSON[key] = json[key];
                    else log(`Unexpected Key: ${key}`,json[key]);
                });

                // Make the root file after looping through all the keys. 
                fs.writeFile(`${contentFolder}/.content.json`, JSON.stringify(rootJSON, null, 4), (err) => {
                    if (err) throw err;
                    log(`Created file for Root AEM Page: ${rootJSON['jcr:content']['jcr:title']}`);
                });

                log(`You can see the file(s) here: ${contentFolder}`);
            } else {
                log(`No AEM Content found in specified content path: ${config.aemContentPath}`);
            }

        } else {
            log(`There was a problem connecting to AEM.`)
            log(`Please ensure that an Author instance of AEM is running on port 4502`);
            log(await response);
        };
    }
}