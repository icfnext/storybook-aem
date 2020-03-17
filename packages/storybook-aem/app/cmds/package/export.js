const log = require('../../utils/logger');

module.exports = async (args,config) => {
    log(`export`);
    /* 
export
curl -u admin:admin -X POST http://localhost:4502/crx/packmgr/service/.json/etc/packages/uhc-aem/uhc-storybook-library.zip?cmd=build
curl -u admin:admin http://localhost:4502/etc/packages/uhc-aem/uhc-storybook-library.zip > /Users/jzeltman/Development/_projects/uhc/uhc-com-replatform/uhc-aem-ui.content/src/main/content/jcr_root/content/storybook-library/uhc-storybook-library.zip
*/

}