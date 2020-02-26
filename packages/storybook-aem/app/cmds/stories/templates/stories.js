const fs = require('fs');
const path = require('path');

module.exports = config => {
    const storyPath = path.resolve(process.cwd(), config.projectRoot, config.relativeProjectRoot, config.componentPath, config.componentType, config.component, `${config.component}.stories.js`);
    let fileContents;

    try {
        if (fs.existsSync(storyPath)) fileContents = fs.readFileSync(storyPath, 'utf8');
        else {

            fileContents = `/**\n  * Storybook stories for the ${config.component} component\n  */\n`;

            if (config.jsFramework) {
                if (config.jsFramework === 'react') {
                    fileContents += `import React, { Component } from "${config.jsFramework}";\n`;
                }
                fileContents += `import Wrapper, { HTMLWrapper } from 'storybook-aem-wrappers';
import { Grid } from 'storybook-aem-grid';
import { StyleSystem } from 'storybook-aem-style-system';
`;
            }

            if (config.storyRoot) {
                fileContents += `export default { title: '${config.storyRoot}|${config.component}' };\n`;
            } else {
                fileContents += `export default { title: '${config.component}' };\n`;
            }
        }
    } catch(err) {
        console.error(err)
    }
    
    config.stories.forEach( story => {
        fileContents += `\n
const ${story.name}ContentPath = "${story.contentPath || ''}";
export const ${story.name} = () => (
    <Wrapper
        contentPath={${story.name}ContentPath}
        styleSystem={StyleSystem()}
        grid={Grid()}
        classes="${config.component}"
    />
);
${story.name}.story = {
    name: '${story.displayName}',
    parameters: {}
};`
    });
    
    fs.writeFile(storyPath, fileContents, (err) => {
        if (err) throw err;
        console.log(`[storybook-aem] Created or Updated ${config.componentType}/${config.component}/${config.component}.stories.js`);
    });

    console.log(`[storybook-aem] Story file created for the ${config.component}`);
    console.log(`[storybook-aem] Story file -> ${storyPath}`);
}