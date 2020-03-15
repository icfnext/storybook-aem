const fs = require('fs');
const path = require('path');
const prompts = require('prompts');

const fetchFromAEM = require('../../utils/fetchFromAEM');
const error = require('../../utils/error');
const getDirectories = require('../../utils/getDirectories');
const toCamelCase = require('../../utils/toCamelCase');
const getEditDialog = require('../../utils/getEditDialog');

const cwd = process.cwd();

module.exports = async args => {
    console.log('Import');
    const packageJSON = require(path.resolve(cwd, 'package.json'));
    
    if (Object.entries(packageJSON).length === 0) {
        error('No package.json file found. Please run this from the directory with the package.json file for your project', true);
    } else {
/*
        const config = packageJSON['storybook-aem'];
        const contentFile = config.hasOwnProperty('contentSyncLocation') ? 
            path.resolve(process.cwd(), config.projectRoot, config.relativeProjectRoot, config.contentSyncLocation, `content.json`) : 
            false;
        if (!contentFile || !fs.existsSync(contentFile)) console.error(`[storybook-aem] The AEM Content Folder does not exist, or it could not be found.`,contentFile);
        console.log('contentFile:', contentFile)
        // const content = JSON.parse(fs.readFileSync(contentFile));

        const response = await fetchFromAEM({
            url: `${config.aemContentPath}/jcr:content?${[
                `:contentType=json`,
                `:operation=import`,
            ].join('&')}`,
            body: fs.readFileSync(contentFile),
            method: 'POST',
            errorMessage: `Error creating story(ies)`
        });

        if (await response.ok) {
            // console.log('wowzers', await response);
        } else {
            // console.log('ruh roh', await response);
        }

        // console.log('content:', content)
*/
    }
}