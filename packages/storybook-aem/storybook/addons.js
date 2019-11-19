import '@storybook/addon-knobs/register';
import '@storybook/addon-viewport/register';
import '@storybook/addon-a11y/register';
import '@storybook/addon-backgrounds/register';
import '@storybook/addon-docs/register';

import addonAPI from '@storybook/addons';

let firstLoad = true;
addonAPI.register('storybook-aem/welcome', storybookAPI => {
    storybookAPI.onStory((kind, story) => {
        // when you enter a story, if you are just loading storybook up, default to a specific kind/story. 
        if (firstLoad) {
            firstLoad = false; // make sure to set this flag to false, otherwise you will never be able to look at another story.
            storybookAPI.selectStory('welcome', 'welcome');
        }
    });
});