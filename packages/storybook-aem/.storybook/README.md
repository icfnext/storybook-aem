# Storybook + AEM

## Setup 
1. Add this folder to your UI folder
2. Run npm install command - change @storybook/preact => @storybook/react if using react
`npm install --save-dev @storybook/preact @storybook/addon-a11y @storybook/addon-backgrounds @storybook/addon-docs @storybook/addon-knobs @storybook/addon-storysource @storybook/addon-viewport @storybook/html babel-loader http-proxy-middleware`
3. Open [ui-folder]/.storybook/preview-head.html and update the CSS/JS includes according to your needs
4. Add this to the scripts section of your package.json file: `"storybook": "start-storybook -p 4501"`
5. In the `./.storybook/config.js` file, update the configuration code if you have your stories other than in `[ui-folder]/src/path/to/component`

## Generated Data
If planning on using generated data, it is recommended to do so in a separate build step, and not dynamically. `generateJCRContent` is meant to be used to handle this by passing it the data object, along with the path at which you want to create the component data. See the `./sample-stories/cta.data.js` file for example data.

## Stories
See `./sample-stories/cta.stories.js` for an example of how to use the provided wrapper components. These wrappers are useful for wrapping flat HTML, either supplied by hand, or fetched from AEM using the full content path. 

## Proxy & Middleware
There is a middleware proxy that will rewrite all requests to AEM running on 4502 in order to circumvent CORS issues. Following this setup will force Storybook to run on port 4501, so if you need to access local AEM content, then you can just change the port to 4501, which will then be re-routed to 4502 by the Storybook middleware.