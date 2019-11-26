import React from 'react';
import addons from '@storybook/addons';
import { useParameter } from '@storybook/api';
import { AddonPanel, Placeholder } from '@storybook/components';
import Panel from './src/panel';
import { ADDON_ID, PANEL_ID, PARAM_KEY } from '../constants';

addons.register(ADDON_ID, api => {
    addons.addPanel(PANEL_ID, {
        title: 'Page Template',
        paramKey: PARAM_KEY,
        render: ({ active, key }) => {
            const parameters = useParameter(PARAM_KEY, null);
            if (!parameters) {
                return (
                    <AddonPanel active={active} key={key}>
                        <Placeholder>No Page Templates settings found</Placeholder>
                    </AddonPanel>
                );
            } else {
                return (
                    <AddonPanel active={active} key={key}>
                        <Panel api={api} parameters={parameters} />
                    </AddonPanel>
                );
            }
        }
    });
})