const Import = require('./import');
const Export = require('./export');
module.exports = async (args) => {
/*
 Design
----------------------------------------
 storybook-aem sync
 storybook-aem sync -I
 storybook-aem sync --import
 storybook-aem sync -E
 storybook-aem sync --export

1. No Args = import and export
2. Args only runs one
*/

    if (args.I || args.import) await Import();
    else if (args.E || args.export) await Export();
    else {
        console.log('Import & Export');
    }
}