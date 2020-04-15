import React, { Fragment } from 'react';
import { addons, types } from '@storybook/addons';
import { useAddonState, useParameter } from '@storybook/api';
import { Icons, IconButton } from '@storybook/components';
import { ADDON_ID, JCR_CONTENT, EDITOR_HTML, DEFAULT_AEM_URL } from './constants';

export const OpenInAEM = ({ api }) => {
    // Throw and log no error at this point. Not every story has to use the plugin.
    if (! api.getCurrentStoryData() ||
        ! api.getCurrentStoryData().parameters.openInAEM ||
        ! api.getCurrentStoryData().parameters.openInAEM.contentPath) return null;

    const storyData = api.getCurrentStoryData();
    const openInAEM = storyData.parameters.openInAEM;
    const aemUrl = openInAEM && openInAEM.aemUrl ? openInAEM.aemUrl : DEFAULT_AEM_URL;
    const contentPath = openInAEM.contentPath;

    if (! contentPath.includes(JCR_CONTENT)) {
      console.error(`aemUrl.contentPath must contain '${JCR_CONTENT}' for the ${storyData.name} story. It was: ${contentPath}`);
      return null;
    }

    const pagePath = openInAEM.contentPath.split('/' + JCR_CONTENT)[0];
    const fullUrl = `${aemUrl}/${EDITOR_HTML}${pagePath}.html`;

    console.debug('aemUrl, contentPath, fullUrl', aemUrl, contentPath, fullUrl);

    return (
        <Fragment>
            <IconButton
                key={ADDON_ID}
                active={false}
                title="Open this Story Content in AEM"
                onClick={() => window.top.open(fullUrl)}>
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
