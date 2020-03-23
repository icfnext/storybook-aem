const toWords = require('./toWords');

module.exports = text => {
    // text = toWords(text)
    return text.split(' ').map( word => (
        word.substr(0, 1).toUpperCase() + word.substr(1).toLowerCase()
    )).join(' ');
};
