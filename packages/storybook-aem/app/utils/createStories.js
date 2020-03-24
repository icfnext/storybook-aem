const { exec } = require('child_process');

const fetchFromAEM = require('./fetchFromAEM');
const getCQTemplate = require('./getCQTemplate');

const createStories = async config => {
    if (config.createAEMContent) {
        let baseURL = `${config.aemContentPath}/${config.component}/jcr:content${config.aemContentDefaultPageContentPath}`;
        let cqTemplate = await getCQTemplate(config);
        let editorURL = `http://localhost:4502/editor.html${config.aemContentPath}/${config.component}.html`;

        const copyStories = config.stories.filter(story => story.type === 'aemContent' && story.hasOwnProperty('duplicate') && story.duplicate);
        console.log('copyStories:', copyStories)
        const importStories = config.stories.filter(story => story.type === 'aemContent' && !story.existingContentPath);
        console.log('importStories:', importStories)
        const copyContent = {};
        const importContent = {};
        
        if (importStories.length) {
            importStories.map( story => {
                console.log('\n\ncreate',story);
                // Heading First
                let heading = {
                    'jcr:primaryType': 'nt:unstructured',
                    'sling:resourceType': `${config.aemStoryHeadingComponentResourceType}`,
                };
                heading[`${config.aemStoryHeadingComponentTitleProperty}`] = `Story Content for '${story.name}' story`;
        
                // Then Component
                let component = {};
                
                if (!cqTemplate) {
                    component['jcr:primaryType'] = 'nt:unstructured';
                    component['sling:resourceType'] = `${config.namespace}/components/${config.componentType}/${config.component}`;
                    component[`${config.aemStoryHeadingComponentTitleProperty}`] = `Story Content for '${story.name}' story`;
                } else {
                    component = cqTemplate;
                }
        
                component['jcr:storybookStory'] = `${config.component}|${story.displayName}`;
        
                importContent[`${story.name}Heading`] = heading;
                importContent[`${story.name}`] = component;
            });
        
            const componentCreation = await fetchFromAEM({
                url: `${baseURL}?${[
                    `:contentType=json`,
                    `:operation=import`,
                    `:content=${JSON.stringify(importContent)}`
                ].join('&')}`,
                method: 'POST',
                errorMessage: `Error creating story(ies)`
            });
        
            if (await componentCreation.ok) {
                console.log(`[storybook-aem] Successfully created AEM Content for your stories`);
                console.log(`[storybook-aem] Your stories have been successfully created.`);
                console.log(`[storybook-aem] You can now view and edit your story content`);
                console.log(`[storybook-aem] Story content -> ${editorURL}`);
        
                exec(`open ${editorURL}`);
        
                return true;
            } else {
                console.log(`[storybook-aem] There was a problem creating the AEM content for your stories`);
                return false;
            }
        }

        if (copyStories.length) {
            copyStories.map( story => { console.log('\n\ncopy story',story); });
        }
    }
};

module.exports = createStories;