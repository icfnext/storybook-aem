const fs = require('fs');
const path = require('path');

module.exports = config => {
    const storyPath = path.resolve(process.cwd(), config.projectRoot, config.relativeProjectRoot, config.componentPath, config.componentType, config.component, `${config.component}.stories.js`);
    const fileExists = fs.existsSync(storyPath);
    const fileContents = [];

    try {
        // Add the existing file to the fileContents
        if (fileExists) { 
            fileContents.push(fs.readFileSync(storyPath, 'utf8'));
        } else {
            // Create the basics for the file

            // Add the empty story to the list
            config.stories.unshift({
                name: 'empty',
                displayName: 'Empty Story',
                contentPath: config.aemContentPath ? `${config.aemContentPath}/${config.component}/jcr:content${config.aemContentDefaultPageContentPath}/empty` : ``
            });

            fileContents.push(`/**`);
            fileContents.push(` * Storybook stories for the ${config.component} component`);
            fileContents.push(` */`);

            if (config.jsFramework) {
                if (config.jsFramework === 'react') {
                    fileContents.push(`import React, { Component } from "${config.jsFramework}";`);
                }
                fileContents.push(`import Wrapper, { HTMLWrapper } from 'storybook-aem-wrappers';`);
                fileContents.push(`import { Grid } from 'storybook-aem-grid';`);
                fileContents.push(`import { StyleSystem } from 'storybook-aem-style-system';`);
                fileContents.push(``);
            }

            let defaultTitle = config.storyRoot ? `${config.storyRoot}|${config.component}` : `${config.component}`;
            fileContents.push(`export default {`);
            fileContents.push(`    title: '${defaultTitle}'`);
            fileContents.push(`};`);
        }
    } catch(err) {
        console.error(err)
    }
    
    config.stories.forEach( story => {
        fileContents.push(`\n
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
    parameters: {
    }
};`);
    });
    
    fs.writeFile(storyPath, fileContents.join('\n'), (err) => {
        if (err) throw err;
        console.log(`[storybook-aem] Created or Updated ${config.componentType}/${config.component}/${config.component}.stories.js`);
    });

    console.log(`[storybook-aem] Story file created for the ${config.component}`);
    console.log(`[storybook-aem] Story file -> ${storyPath}`);
}