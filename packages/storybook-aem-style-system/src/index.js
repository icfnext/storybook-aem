import addons from '@storybook/addons';

const channel = addons.getChannel();
let classes = 'testing-style-system';

channel.on('aemStyleSystem:update', event => StyleSystem(event.classes));

export const StyleSystem = (value) => {
    console.log('value:', value)
    if (value !== undefined) classes = value;
    console.log('classes:', classes)
    return classes;
}