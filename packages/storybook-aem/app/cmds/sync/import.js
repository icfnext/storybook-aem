const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const cwd = process.cwd();

const log = require('../../utils/logger');
const error = require('../../utils/error');
const importContent = require('../../utils/importContent');
const createPage = require('../../utils/createPage');
const deletePage = require('../../utils/deletePage');


// tktk - change this to use package manager 
/* 
import
curl -u admin:admin -F file=@"/Users/jzeltman/Development/_projects/uhc/uhc-com-replatform/uhc-aem-ui.content/src/main/content/jcr_root/content/storybook-library/uhc-storybook-library.zip" -F name="/packages/uhc-aem/uhc-storybook-library.zip" -F force=true -F install=true http://localhost:4502/crx/packmgr/service.jsp
*/

module.exports = async args => {
    log(chalk.italic(`Running AEM Sync Export process...`));
    try {

        const packageJSON = require(path.resolve(cwd, 'package.json'));
        
        if (Object.entries(packageJSON).length === 0) {
            throw error(chalk.red('No package.json file found. Please run this from the directory with the package.json file for your project'), true);
        }

        const config = packageJSON['storybook-aem'];
        const pagePath = config.aemContentDefaultPageContentPath;
        const pagePathKeys = (pagePath.startsWith('/') ? pagePath.substring(1,pagePath.length) : pagePath).split('/');
        const pagePathRootKey = pagePathKeys.shift();

        // Delete the content folder if the param is passed
        if (args.clean) await deletePage(config.aemContentPath);

        const contentFolder = config.hasOwnProperty('contentSyncLocation') 
            ? path.resolve(process.cwd(), config.projectRoot, config.relativeProjectRoot, config.contentSyncLocation) 
            : false;
        if (!contentFolder || !fs.existsSync(contentFolder)) {
            throw `[storybook-aem] The AEM Content Folder does not exist, or it could not be found. ${contentFolder}`;
        }
        
        const parentPageFile = path.resolve(contentFolder,'.jcr.content.json');
        if (!fs.existsSync(parentPageFile)) {
            throw `[storybook-aem] The AEM Content Folder does not exist, or it could not be found. ${parentPageFile}`;
        } 
        const parentPageJSON = JSON.parse(fs.readFileSync(parentPageFile));
        
        // Create the root page
        await createPage(config.aemContentPath);
        log(chalk.bold(`Parent Page created: `) + chalk.underline(`http://localhost:4502${config.aemContentPath}`));
        // Create root page jcr:content
        await importContent(`${config.aemContentPath}/jcr:content`,parentPageJSON);
        log(chalk.italic(`Parent Page Content created: `) + chalk.italic.underline(`http://localhost:4502${config.aemContentPath}/jcr:content`));

        // Loop over the content folder and make aem pages + content for each
        fs.readdirSync(contentFolder).forEach( async file => {
            let fileName = file.split('.')[0];
            if (fileName) {
                log(chalk.italic(`Reading Content file: ${file}`));
                const contentPath = `${config.aemContentPath}/${fileName}`;
                const fileJSON = JSON.parse(fs.readFileSync(path.resolve(contentFolder,file)));

                // Create the page for the component
                await createPage(`${contentPath}`);
                log(chalk.bold('Page Created: ') + chalk.underline(`http://localhost:4502${contentPath}`));

                // URL length cannot be longer than 2048 characters,
                // So if the fileJSON content is less than 2000, we can push it up all at once
                if (JSON.stringify(fileJSON).length < 2000) {
                    await importContent(`${contentPath}/jcr:content`,fileJSON);
                    log(chalk.bold('Content Created: ') + chalk.underline(`http://localhost:4502${contentPath}`));

                // If the fileJSON is longer than 2000 we have to split it into chunks, and make multiple POSTs
                } else {
                    // Separate the page content from the metadata
                    let pageContent = fileJSON.hasOwnProperty(pagePathRootKey) ? fileJSON[pagePathRootKey] : {};
                    if (pageContent) delete fileJSON[pagePathRootKey];
                    // Import jcr:content
                    await importContent(`${contentPath}/jcr:content`,fileJSON);
                    log(chalk.italic(`Metadata Created: `) + chalk.italic.underline(`http://localhost:4502${contentPath}/jcr:content`));
                    
                    let chunks = [], chunk = {};
                    // remove the 'nodes' for what is in between the content and the page path
                    // e.g. /root/regioncontainer-main/responsivegrid
                    pagePathKeys.forEach(node => pageContent = pageContent[node]);
                    // Each node has a jcr:primaryType, so add it to the chunk, 
                    // and then remove it to make component grouping easier
                    if (pageContent.hasOwnProperty('jcr:primaryType')) {
                        chunk['jcr:primaryType'] = pageContent['jcr:primaryType'];
                        delete pageContent['jcr:primaryType'];
                    }

                    // Group Content Item into component groups. There should be a component and componentHeading for each
                    const components = Object
                        .keys(pageContent)
                        .filter(key => !key.includes('Heading'))
                        .map(component => ({
                            [`${component}Heading`]: pageContent[`${component}Heading`],
                            [component]: pageContent[component]
                        }));

                    // Group the component chunks together, but ensure that each grouping is less than 2000 characters long
                    components.forEach( component => {
                        if ((JSON.stringify(chunk).length + JSON.stringify(component).length) < 2000) {
                            chunk = {
                                ...chunk,
                                ...component
                            }
                        } else {
                            chunks.push(chunk);
                            chunk = {};
                            chunk = { ...component }
                        }
                    });

                    // Check if there's actually content and then POST to AEM
                    if (chunks.length) {
                        for (let c in chunks) await importContent(`${contentPath}/jcr:content${pagePath}/`,chunks[c]);
                        log(chalk.bold('Content Created: ') + chalk.underline(`http://localhost:4502${contentPath}`));
                    }
                }
            }
        });
    } catch(e) {
        throw log(`An error occurred during the import process`, e);
    }
}