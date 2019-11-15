const ncp = require('ncp').ncp;
const source = `${__dirname}/../../../storybook/.storybook`;
const fs = require('fs');

module.exports = config => {
    ncp.limit = 16;

    console.log(`[storybook-aem] Copying storybook files to ${config.uiApps}/.storybook`);
    
    ncp(source, `${config.uiApps}/.storybook`, (err) => {
        if (err) return console.error(err);
        console.log(`[storybook-aem] Storybook Files Copied to ui.apps folder: ${config.uiApps}/.storybook`);
    });

    let fileContents = `import { addParameters, addDecorator, configure } from '@storybook/${config.jsFramework}';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import { withA11y } from '@storybook/addon-a11y';
import { DocsPage, DocsContainer } from '@storybook/addon-docs/blocks';

addDecorator(withA11y);
addParameters({
    viewport: {
        viewports: INITIAL_VIEWPORTS
    },
    docs: {
        container: DocsContainer,
        page: DocsPage,
    },
});

configure(require.context('${config.storiesPath}', true, /\.stories\.js$/), module);`;

    fs.writeFile(`${config.uiApps}/.storybook/config.js`, fileContents, (err) => {
        if (err) throw err;
        console.log(`[storybook-aem] Created ${config.uiApps}/.storybook/config.js`);
    });
}
