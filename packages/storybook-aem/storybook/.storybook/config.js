import packageJSON from '../package.json';

import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import { withA11y } from '@storybook/addon-a11y';
import { DocsPage, DocsContainer } from '@storybook/addon-docs/blocks';

const storyLocation = '../src';
if (packageJSON['storybook-aem'].useDefaultStoryLocation) storyLocation = packageJSON['storybook-aem'].componentPath;

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

configure(require.context(storyLocation, true, /\.stories\.js$/), module);