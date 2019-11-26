import addons from '@storybook/addons';

const channel = addons.getChannel();
let classes = 'testing-style-system';

channel.on('aemStyleSystem:update', event => StyleSystem(event.classes));

export const StyleSystem = (value) => {
    if (value !== undefined) classes = value;
    return classes;
}