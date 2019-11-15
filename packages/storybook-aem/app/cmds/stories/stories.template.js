const fs = require('fs');
const toCamelCase = require('../../utils/toCamelCase');

module.exports = config => {
    const componentPath = `${config.componentPath}/${config.component}`;
    let fileContents = `/**\n  * Storybook stories for the ${config.component} component\n  */`;
    let ComponentWrapper;

    if (config.jsFramework) {
        fileContents += `\n\n`;
        if (config.htmlType.includes('AEM')) {
            ComponentWrapper = 'AEMWrapper';
            fileContents += `import { AEMWrapper } from "${config.jsFramework}-wrapper-components";\n`
        } else if (config.htmlType.includes('Manual')) {
            ComponentWrapper = 'ManualWrapper';
            fileContents += `import { ManualWrapper } from "${config.jsFramework}-wrapper-components";\n`
        }
        fileContents += `\n`;
    }

    fileContents += `export default { title: '${config.component}' };\n\n`;

    if (typeof config.stories === 'string') {
        if ( config.stories.indexOf(',') !== -1) config.stories = config.stories.split(',');
        else config.stories = [config.stories];
    }
    
    config.stories.forEach( story => {
        // let storyName = toCamelCase(story)
        fileContents += `export const ${toCamelCase(story)} = () => <${ComponentWrapper} />;\n`
    });

    fs.writeFile(`${componentPath}/${config.component}.stories.js`, fileContents, (err) => {
        if (err) throw err;
        console.log(`[storybook-aem] Created ${componentPath}/${config.component}.stories.js`);
    });

    console.log(`[storybook-aem] Storybook files created for the ${config.component}, you can find them here: ${componentPath}/`);

}