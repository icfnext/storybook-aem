import React from 'react';
import addons from '@storybook/addons';
import Panel from './src/panel';
import { ADDON_ID, PANEL_ID, PARAM_KEY } from '../constants';

addons.register(ADDON_ID, api => {
    addons.addPanel(PANEL_ID, {
        title: 'Grid',
        render: ({ active, key }) => <Panel api={api} key={key} active={active} />,
        paramKey: PARAM_KEY,
    });
});