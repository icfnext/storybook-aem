import React, { Fragment } from 'react';
import { addons, types } from '@storybook/addons';
import { useAddonState, useParameter } from '@storybook/api';
import { IconButton } from '@storybook/components';
import { ADDON_ID, JCR_CONTENT, EDITOR_HTML } from './constants';
import { AEMIcon } from './aem-icon.js';

const TMP = 'M2390 4045 c-101 -23 -186 -71 -265 -150 -38 -38 -79 -87 -90 -108 -13 -25 -24 -35 -35 -31 -54 21 -137 34 -213 34 -169 0 -286 -49 -408 -170 -81 -80 -124 -151 -154 -255 -25 -83 -23 -240 3 -321 l19 -62 -40 -23 c-23 -12 -69 -50 -103 -85 -145 -145 -197 -375 -127 -564 38 -105 152 -243 234 -286 34 -17 34 -17 13 -98 -19 -73 -21 -214 -4 -288 44 -188 206 -362 393 -420 89 -28 253 -30 332 -4 28 9 55 16 61 16 7 0 26 -22 43 -49 118 -183 350 -281 561 -237 143 30 275 120 350 236 18 28 37 50 44 50 6 0 34 -7 61 -16 78 -26 243 -24 330 3 167 52 319 198 376 358 38 109 42 264 9 375 -15 52 -14 54 39 88 120 78 222 240 240 382 28 209 -76 432 -246 535 l-50 29 20 61 c27 85 26 246 -2 335 -59 188 -223 347 -407 394 -104 27 -269 18 -364 -19 -11 -4 -23 6 -38 33 -56 100 -182 202 -300 241 -84 28 -199 35 -282 16z m202 -76 c86 -18 177 -68 243 -134 33 -33 67 -73 75 -89 14 -28 14 -30 -14 -50 -16 -12 -56 -44 -90 -72 -82 -68 -121 -90 -191 -109 -75 -19 -145 -19 -220 0 -70 19 -109 41 -191 109 -34 28 -74 60 -90 72 -28 20 -28 22 -14 50 25 48 132 150 188 178 99 50 204 66 304 45z m-667 -350 l40 -14 -3 -70 c-8 -161 -48 -263 -140 -354 -95 -95 -186 -132 -364 -145 l-66 -5 -12 32 c-82 230 47 485 285 564 50 16 204 11 260 -8z m1476 -15 c190 -90 294 -320 234 -522 l-16 -51 -67 5 c-178 13 -269 50 -364 145 -92 91 -129 187 -141 360 l-5 67 47 16 c33 11 74 15 146 13 88 -2 108 -6 166 -33z m-1318 -83 c132 -121 254 -171 415 -171 164 0 270 40 399 150 l68 58 6 -26 c4 -15 7 -48 8 -73 2 -74 37 -172 92 -254 93 -139 224 -218 398 -238 l100 -12 -60 -70 c-104 -122 -149 -241 -149 -397 0 -147 53 -283 156 -396 30 -33 54 -62 54 -65 0 -2 -37 -7 -82 -10 -176 -13 -324 -97 -416 -236 -64 -96 -75 -131 -99 -300 l-8 -55 -53 47 c-121 108 -227 155 -368 164 -164 11 -301 -36 -429 -146 -38 -33 -73 -60 -76 -61 -3 0 -9 37 -12 83 -10 143 -61 250 -167 354 -93 91 -242 152 -372 153 -27 0 -48 3 -48 8 0 4 27 38 60 77 95 112 136 210 146 349 11 156 -36 293 -146 425 -34 40 -60 74 -58 76 2 1 45 8 96 14 111 14 174 36 249 88 150 103 243 275 243 448 0 30 2 55 5 55 3 0 24 -17 48 -39z m-777 -638 c9 -16 40 -54 68 -86 68 -77 102 -145 116 -230 22 -129 -14 -254 -105 -362 -28 -33 -63 -77 -79 -97 l-28 -38 -42 30 c-131 89 -216 243 -216 390 0 150 88 315 210 396 46 30 54 29 76 -3z m2477 -2 c160 -109 240 -320 192 -500 -30 -115 -117 -235 -208 -288 l-35 -21 -79 94 c-89 108 -120 167 -135 259 -22 131 17 249 121 374 34 40 66 82 72 92 13 25 23 24 72 -10z m-2207 -942 c129 -23 257 -115 324 -232 33 -58 57 -158 62 -259 4 -77 3 -78 -99 -98 -75 -15 -184 0 -261 35 -60 28 -161 124 -191 183 -39 76 -54 150 -49 241 3 47 11 98 18 114 12 25 17 27 75 27 34 0 88 -5 121 -11z m2053 -16 c31 -75 32 -194 3 -290 -29 -92 -122 -197 -217 -243 -103 -50 -200 -57 -320 -24 l-51 14 3 68 c9 167 51 270 149 367 92 91 199 132 350 134 69 1 72 0 83 -26z m-999 -455 c60 -18 104 -45 180 -108 40 -33 82 -67 94 -75 20 -15 20 -15 2 -50 -24 -44 -118 -134 -176 -168 -128 -75 -322 -75 -450 0 -58 34 -152 124 -176 168 -18 35 -18 35 2 50 12 8 54 42 95 76 84 70 157 108 233 119 58 9 144 4 196 -12z';

export const OpenInAEM = ({ api }) => {
    // Throw and log no error at this point. Not every story has to use the plugin.
    if (! api.getCurrentStoryData() ||
        ! api.getCurrentStoryData().parameters.openInAEM ||
        ! api.getCurrentStoryData().parameters.openInAEM.contentPath) return null;

    const storyData = api.getCurrentStoryData();
    const openInAEM = storyData.parameters.openInAEM;
    const aemUrl = openInAEM && openInAEM.aemUrl ? openInAEM.aemUrl : '';
    const contentPath = openInAEM.contentPath;

    if (! contentPath.startsWith('/')) {
      console.error(`aemUrl.contentPath must be a relative path that starts with '/' for the ${storyData.name} story. It was: ${contentPath}`);
      return null;
    }

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
                <AEMIcon></AEMIcon>
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
