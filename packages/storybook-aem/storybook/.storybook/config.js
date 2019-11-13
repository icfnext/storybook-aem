import { h } from 'preact';
import { configure, addParameters, addDecorator } from '@storybook/preact';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import { withA11y } from '@storybook/addon-a11y';
import { DocsPage, DocsContainer } from '@storybook/addon-docs/blocks';
import packageJSON from '../package.json';

import { withKnobs, text, boolean } from "@storybook/addon-knobs";
import GlobalWrapper from './wrappers/global.decorator';

const storyLocation = packageJSON.storybook.storyLocation || "../src";
const GlobalWrapperDecorator = storyFn => {
    return <GlobalWrapper   globalClientLibs={packageJSON.storybook.globalClientLibs}
                            isolated={boolean("Include Parent Grid", false)}
                            wrapperClasses={text("CSS Classes","aem-GridColumn aem-GridColumn--default--12")}
                            story={storyFn} />;
};

addDecorator(GlobalWrapperDecorator)
addDecorator(withA11y);
addParameters({
    viewport: {
        viewports: INITIAL_VIEWPORTS
    },
    // Change any colors you want here. 
    // Plan is to integrate this with the site color palette 
    backgrounds: [
        { name: 'twitter', value: '#00aced' },
        { name: 'facebook', value: '#3b5998' },
    ],
    docs: {
        container: DocsContainer,
        page: DocsPage,
    },
});

configure(require.context("../src", true, /\.stories\.js$/), module);