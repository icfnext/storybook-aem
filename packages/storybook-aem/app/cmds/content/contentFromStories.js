const fetchFromAEM = require('../../utils/fetchFromAEM');
const createPage = require('../../utils/createPage');
const createPageJCRContent = require('../../utils/createPageJCRContent');
const createStories = require('../../utils/createStories');

module.exports = async config => {
    if (
        !config ||
        !config.createAEMContent ||
        config.stories.length === 0
    ) return false;
    else {
        console.log(`[storybook-aem] Checking to see if '${config.component}' Component Page exists in AEM...`);
        const pageCheckResponse = await fetchFromAEM({
            url: `${config.aemContentPath}/${config.component}.infinity.json`,
            method: 'GET',
            errorMessage: 'component.infinity.json error:'
        });

        if (await pageCheckResponse.ok) {
            const pageJSON = await pageCheckResponse.json();
            console.log(`[storybook-aem] Component Page for '${config.component}' component exists.`);

            if (
                pageJSON.hasOwnProperty('jcr:content') &&
                pageJSON['jcr:content'].hasOwnProperty('cq:template') && 
                pageJSON['jcr:content']['cq:template'] === config.aemContentDefaultPageTemplate
            ) {
                console.log(`[storybook-aem] Component Page exists and has page content on expected template.`);
                console.log(`[storybook-aem] Creating content for stories...`);
                createStories(config);
            }
        } else {
            if (pageCheckResponse.status === 404) {
                console.log(`[storybook-aem] Component page doesn't exist.`);
                console.log(`[storybook-aem] Creating Component. Waiting...`);

                const pageCreation = await createPage(config);
                if (await pageCreation) {
                    console.log(`[storybook-aem] Component page created for '${config.component}' component.`);
                    console.log(`[storybook-aem] Creating JCR:Content for '${config.component}' component. Waiting...`);
                    
                    const jcrContentCreation = await createPageJCRContent(config);
                    if (await jcrContentCreation) {
                        console.log(`[storybook-aem] Creating JCR:Content for '${config.component}' component succeeded.`);
                        console.log(`[storybook-aem] Creating content for stories...`);
                        const storyCreationStatus = await createStories(config);
                        if (await storyCreationStatus) {
                            console.log(`[storybook-aem] Stories created successfully.`);
                            console.log(`[storybook-aem] Story content -> http://localhost:4502/editor.html${config.aemContentPath}/${config.component}.html`);
                        } else {
                            console.log(`[storybook-aem] Stories creation failed. :(`);
                        }

                    } else {
                        console.log(`[storybook-aem] Creating JCR:Content for '${config.component}' component failed.`);
                    }
                } else {
                    console.log(`[storybook-aem] Component page WAS NOT created for '${config.component}' component.`);
                }
            } else {
                console.log(`[storybook-aem] a problem occurred`,pageCheckResponse)
            }
        }
    }
}