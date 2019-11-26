import addons from '@storybook/addons';

const channel = addons.getChannel();
let classes = 'aem-GridColumn aem-GridColumn--default--12';

channel.on('aemGrid:change', event => Grid(event.classes));
channel.on('aemGrid:set', event => Grid(event.classes));

export const Grid = (value) => {
    classes = value || classes;
    return classes;
}