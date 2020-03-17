const path = require('path');
const prompts = require('prompts');

const error = require('../../utils/error');

const cwd = process.cwd();

module.exports = async args => {
    const packageJSON = require(path.resolve(cwd, 'package.json'));
    console.log('package')
    
    if (Object.entries(packageJSON).length === 0) {
        error('No package.json file found. Please run this from the directory with the package.json file for your project', true);
    } else {

    }
}