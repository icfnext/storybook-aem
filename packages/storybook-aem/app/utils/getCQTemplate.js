const path = require('path');
const fs = require('fs');
const xml2json = require('xml2json');

const xmlToJSONCleanup = json => {
    Object.keys(json).forEach(key => {
        // Remove all xmlns keys, they aren't allowed in the POST call
        if (key.includes('xmlns')) delete json[key];
        // Fix the styleIds so they work
        if (key === 'cq:styleIds') json[key] = json[key].replace(/\[|\]/g,'').split(',');
        // Recursively cleanup 
        if (typeof json[key] === 'object') xmlToJSONCleanup(json[key]);
    });
    
    return json;
};

const getCQTemplate = async config => {
    const cqTemplatePath = path.resolve(process.cwd(), config.projectRoot, config.relativeProjectRoot, config.componentPath, config.componentType, config.component, `_cq_template.xml`);

    try {
        const xml = fs.readFileSync(cqTemplatePath, 'utf-8');
        
        if (!xml) {
            console.log(`[storybook-aem] There was no _cq_template.xml file`,data);
            return false;

        } else {
            let json = JSON.parse(xml2json.toJson(xml))['jcr:root'];
            // Add the sling:resourceType so that the component can be created
            json['sling:resourceType'] = `${config.namespace}/components/${config.componentType}/${config.component}`;
            
            return xmlToJSONCleanup(json);
        }
    } catch(e) {
        console.error(`[storybook-aem] There was an error reading the _cq_template.xml for the '${config.component}' component`,e);
        return false;
    }
};

module.exports = getCQTemplate;