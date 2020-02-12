import addons, { makeDecorator } from '@storybook/addons';
import { PARAM_KEY, SET_OPTIONS } from './constants';

export const withQTest = makeDecorator({
    name: 'withQTest',
    parameterName: PARAM_KEY,
    skipIfNoParametersOrOptions: true,
    allowDeprecatedUsage: true,
    wrapper: (getStory, context, { options, parameters }) => {
        const storyOptions = parameters || options;
    
        const channel = addons.getChannel();
        channel.emit(SET_OPTIONS, storyOptions);
    
        return getStory(context);
    },
});