const { version } = require('../../package.json');
const log = require('../utils/logger');

module.exports = (args) => log(`v${version}`);