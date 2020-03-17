const Import = require('./import');
const Export = require('./export');
const log = require('../../utils/logger');

module.exports = async (args) => {
    if (args.I || args.import || args._.includes('import')) await Import(args);
    else if (args.E || args.export || args._.includes('export')) await Export(args);
    else {
        log([
            `Please specify a sync command. For Example:\n`,
            `  storybook-aem sync <command>\n`,
            `Where <command> is one of these values:`,
            `  import, --import, -I`,
            `  export, --export, -E\n`,
        ].join('\n'));
    }
};