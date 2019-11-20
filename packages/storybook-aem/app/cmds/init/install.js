const fs = require('fs');
const path = require('path');
const npm = require('npm');
const ncp = require('ncp');
const cwd = process.cwd();

module.exports = async config => {
    const packageJSONPath = path.resolve(cwd, config.projectRoot, config.relativeProjectRoot, config.packageJSON)

    const packageJSON = require(packageJSONPath);
    packageJSON['storybook-aem'] = { ...config };
    /*
        Need to figure out relative pathing
        let storybookLocalPath = `${config.uiApps}/.storybook`;
        let storybookAEMPath = `${config.jcrRootPath}/etc/designs/${config.namespace}/storybook`;
        'build-storybook': `build-storybook -c ${storybookLocalPath} -o ${storybookAEMPath}`
    */ 
    packageJSON.scripts = {
        ...packageJSON.scripts,
        'storybook': 'start-storybook -p 4501'
    }

    fs.writeFileSync(packageJSONPath, JSON.stringify(packageJSON, null, 2));

    if (config.storybookLocation) {

        let storybookDirectory = path.resolve(cwd, config.projectRoot, config.relativeProjectRoot, config.storybookLocation);
        if (!fs.existsSync(storybookDirectory)){
            fs.mkdirSync(storybookDirectory);
        }
        let defaultStoriesDirectory = path.resolve(cwd, config.projectRoot, config.relativeProjectRoot, config.componentPath, 'designs');
        if (!fs.existsSync(defaultStoriesDirectory)){
            fs.mkdirSync(defaultStoriesDirectory);
        }

let configContents = `import { addParameters, addDecorator, configure } from '@storybook/${config.jsFramework}';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import { withA11y } from '@storybook/addon-a11y';
import { DocsPage, DocsContainer } from '@storybook/addon-docs/blocks';
import theme from './theme';

addDecorator(withA11y);
addParameters({
    options: {
        theme: theme
    },
    viewport: {
        viewports: INITIAL_VIEWPORTS
    },
    docs: {
        container: DocsContainer,
        page: DocsPage,
    },
});

configure(require.context('${config.storybookStoryLocation}', true, /\.stories\.js$/), module);`;

let previewHeadContents = false;
if (config.clientlibs) {
    previewHeadContents = ``;
    config.clientlibs.forEach( clientlib => {
        previewHeadContents += `<script type="text/javascript" src="http://localhost:4502${clientlib.aemPath}.js"></script>\n`;
        previewHeadContents += `<link rel="stylesheet" href="http://localhost:4502${clientlib.aemPath}.css" type="text/css">\n`;
    });
}

        ncp(path.resolve(__dirname,'../../../storybook/'), storybookDirectory, (err) => {
            if (err) return console.error(err);
            console.log(`[storybook-aem] Storybook Files Copied to ui.apps folder: ${config.uiApps}/.storybook`);
    
            fs.writeFile(`${storybookDirectory}/config.js`, configContents, (err) => {
                if (err) throw err;
                console.log(`[storybook-aem] Created ${storybookDirectory}/config.js`);
            });
            if (previewHeadContents) {
                fs.writeFile(`${storybookDirectory}/preview-head.html`, previewHeadContents, (err) => {
                    if (err) throw err;
                    console.log(`[storybook-aem] Created ${storybookDirectory}/config.js`);
                });
            }
        });

        ncp(path.resolve(__dirname,'../../../designs/'), defaultStoriesDirectory, (err) => {
            if (err) return console.error(err);
            console.log(`[storybook-aem] Storybook Default Stories copies to components folder: ${config.componentPath}/designs/`);
        });

        let packages = [
            `webpack`,
            `webpack-cli`,
            `babel-loader`,
            `@babel/plugin-transform-react-jsx`,
            `@storybook/react`,
            `react-wrapper-components`,
            '@storybook/addon-a11y',
            '@storybook/addon-backgrounds',
            '@storybook/addon-docs',
            '@storybook/addon-knobs',
            '@storybook/addon-storysource',
            '@storybook/addon-viewport',
            '@storybook/html',
            '@storybook/theming',
            'http-proxy-middleware',
            'react',
        ];

        // Currently unsupported because of reasons
        // if (config.jsFramework === 'preact') { 
        //     packages.push('preact');
        //     packages.push('preact-compat');
        //     packages.push('@babel/core');
        // }
        if (config.jsFramework === 'react') { 
            packages.push('react'); 
        }

        if (config.cssPreProcessor === 'sass') {
            packages.push('style-loader'); 
            packages.push('css-loader'); 
            packages.push('sass-loader'); 
        }

        npm.load({ loaded: false }, (err) => {
            if (err) throw err;
            
            console.log('[storybook-aem] Installing Storybook dependencies');
            npm.commands.install(packages, (installError, data) => {
                if (installError) throw installError;
            });

            npm.on('log', (message) => console.log(message));
            console.log('[storybook-aem] When installation is complete, run `npm run storybook` to start storybook on port 4501')
        });
    }

    return config;
}