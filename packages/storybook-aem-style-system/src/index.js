import addons from '@storybook/addons';
import { useParameter } from '@storybook/api';
import { FORCE_RE_RENDER, STORY_CHANGED } from '@storybook/core-events';
import { ADDON_ID, PANEL_ID, PARAM_KEY } from './constants';

const channel = addons.getChannel();
let classes = 'testing-style-system';

channel.on('aemStyleSystem:update', event => StyleSystem(event.classes));
channel.on(STORY_CHANGED, (event,b,c) => console.log('STORY_CHANGED',event,b,c));

export const StyleSystem = (value) => {
    // const parameters = useParameter(PARAM_KEY, null);

    console.log('value:', value)
    if (value !== undefined) classes = value;
    console.log('classes:', classes)
    return classes;
}
