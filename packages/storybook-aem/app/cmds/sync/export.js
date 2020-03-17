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




// tktk - change this to use package manager 
/* 
export
curl -u admin:admin -X POST http://localhost:4502/crx/packmgr/service/.json/etc/packages/uhc-aem/uhc-storybook-library.zip?cmd=build
curl -u admin:admin http://localhost:4502/etc/packages/uhc-aem/uhc-storybook-library.zip > /Users/jzeltman/Development/_projects/uhc/uhc-com-replatform/uhc-aem-ui.content/src/main/content/jcr_root/content/storybook-library/uhc-storybook-library.zip
*/

const createJSONFile = (filePath,json) => {
    fs.writeFile(filePath, JSON.stringify(json, null, 4), (err) => {
        if (err) throw err;
        // log(`Created file: ${filePath}`);
    });
}

module.exports = async args => {
    log(`Running AEM Sync Export process...`);
    const packageJSON = require(path.resolve(cwd, 'package.json'));
    
    if (Object.entries(packageJSON).length === 0) {
        error('No package.json file found. Please run this from the directory with the package.json file for your project', true);
    } else {

        const config = packageJSON['storybook-aem'];
        if (!config.hasOwnProperty('contentSyncLocation')) throw(`No 'contentSyncLocation' in package.json`);

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

                const parentPageJSON = json.hasOwnProperty('jcr:content') ? json['jcr:content'] : {};
                if (parentPageJSON.hasOwnProperty('jcr:createdBy')) delete parentPageJSON['jcr:createdBy'];
                createJSONFile(`${contentFolder}/.jcr.content.json`,parentPageJSON);

                // Loop through all the data returned, and make files for each aem page 
                keys.filter(key => !key.includes('jcr:')).forEach(key => {
                    const content = json[key];
                    const jcrContent = content.hasOwnProperty('jcr:content') ? content['jcr:content'] : {};
                    if (jcrContent) {
                        delete content['jcr:content'];
                        // Import will fail if jcr:createdBy property exists
                        if (jcrContent.hasOwnProperty('jcr:createdBy')) delete jcrContent['jcr:createdBy']
                    }

                    log(`Creating file for ${key} AEM Page Content: /${key}/.jcr.content.json`);
                    createJSONFile(`${contentFolder}/${key}.jcr.content.json`,jcrContent);
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