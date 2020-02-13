const fetch = require('node-fetch');
const base64 = require('base-64');

const fetchFromAEM = async config => {
    const errorMessage = config.errorMessage || 'Error Fetching from AEM';
    const url = config.url.indexOf('http://localhost:4502') !== -1 ? config.url : `http://localhost:4502${config.url}`
    const response = await fetch(
        url,
        {
            method: config.method,
            headers: {
                'Authorization': 'Basic ' + base64.encode(`admin:admin`)
            }
        }
    ).catch(error => console.log(errorMessage,error));

    return response;
};
const createPage = async config => {
    const response = await fetchFromAEM({
        url: `${config.aemContentPath}/${config.component}?jcr:primaryType=cq:Page`,
        method: 'POST',
        errorMessage: 'Error creating page:'
    });
    
    if (await response.ok) return true;
    else return false;
};

const createPageJCRContent = async config => {
    const params = [
        `jcr:primaryType=cq:PageContent`,
        `sling:resourceType=${config.aemContentDefaultPageResourceType}`,
        `title=${config.component}`,
        `cq:template=${config.aemContentDefaultPageTemplate}`
    ]

    const response = await fetchFromAEM({
        url: `${config.aemContentPath}/${config.component}/jcr:content?${params.join('&')}`,
        method: 'POST',
        errorMessage: 'Error creating JCR:Content:'
    });

    if (await response.ok) return true;
    else return false;
}

const createStories = async config => {
    let baseURL = `${config.aemContentPath}/${config.component}/jcr:content${config.aemContentDefaultPageContentPath}`;

    // first do headings
    for (let h = 0; h < config.stories.length; h++) {
        let story = config.stories[h];
        let headingParams = [
            `jcr:primaryType=nt:unstructured`,
            `sling:resourceType=${config.aemStoryHeadingComponentResourceType}`,
            `${config.aemStoryHeadingComponentTitleProperty}=Story Content for '${story.name}' story`
        ];

        console.log(`[storybook-aem] Creating Title for '${story.name}' story`)

        const headingCreation = await fetchFromAEM({
            url: `${baseURL}/${story.name}Heading?${headingParams.join('&')}`,
            method: 'POST',
            errorMessage: `Error creating story heading for '${story.name}' story`,
            name: `${story.name}Heading`
        });

        if (await headingCreation.ok) {
            console.log(`[storybook-aem] Successfully create Title for '${story.name}' story`)
            console.log(`[storybook-aem] Story Title is: Story Content for '${story.name}' story`);
        } else {
            console.log(`[storybook-aem] There was a problem creating the story Title for the '${story.name}' story`);
        }
    }

    // then do components
    for (let c = 0; c < config.stories.length; c++) {
        let story = config.stories[c];
        let componentParams = [
            `jcr:primaryType=nt:unstructured`,
            `sling:resourceType=${config.namespace}/components/${config.componentType}/${config.component}`,
            `:order=after ${story.name}Heading`
        ];
        const componentCreation = await fetchFromAEM({
            url: `${baseURL}/${story.name}?${componentParams.join('&')}`,
            method: 'POST',
            errorMessage: `Error creating story heading for '${story.name}' story`,
            name: `${story.name}Heading`
        });

        if (await componentCreation.ok) {
            console.log(`[storybook-aem] Successfully create component for '${story.name}' story`)
        } else {
            console.log(`[storybook-aem] There was a problem creating the story component for the '${story.name}' story`);
        }
    }

    console.log(`[storybook-aem] Your stories have been successfully created.`);
    console.log(`[storybook-aem] You can now view and edit your story content`);
    console.log(`[storybook-aem] Story content -> http://localhost:4502/editor.html${config.aemContentPath}/${config.component}.html`);
    // TKTKTK Open link in browser 
    // open `http://localhost:4502/editor.html${config.aemContentPath}/${config.component}.html`
    
    return true;
}

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
                        console.log('storyCreationStatus:', await storyCreationStatus)
                        if (await storyCreationStatus) {
                            console.log(`[storybook-aem] Stories created successfully.`);
                            
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