import React, { Fragment } from 'react';
import { addons, types } from '@storybook/addons';
import { useAddonState, useParameter } from '@storybook/api';
import { Icons, IconButton } from '@storybook/components';
import { ADDON_ID } from './constants';

export const OpenInAEM = ({ api }) => {

    console.log('api:', api, Object.keys(api));
    // api.getParamters()
    if (api.hasOwnProperty('getParameters')) {
        // console.log('typeof api.getParameters',typeof api.getParameters)
        console.log('api.getParameters():', api.getParameters(api.storyId,ADDON_ID))
    }
    if (api.hasOwnProperty('getCurrentStoryData')) {
        console.log('api.getCurrentStoryData():', api.getCurrentStoryData())
    }
    // const [state, setState] = useAddonState(ADDON_ID);
    // const [param, setParam] = useParameter(ADDON_ID);

    return (
        <Fragment>
            <IconButton
                key={ADDON_ID}
                active={false}
                title="Open this Story Content in AEM"
                onClick={() => window.open('http://google.com')}
            >
                <Icons icon="redirect" />
            </IconButton>
        </Fragment>
    )
};

addons.register(ADDON_ID, (api) => {
  addons.add(ADDON_ID, {
    title: 'openInAEM',
    type: types.TOOL,
    match: ({ viewMode }) => viewMode === 'story',
    render: () => <OpenInAEM api={api} />
  });
});