const regex = /[A-Z\xC0-\xD6\xD8-\xDE]?[a-z\xDF-\xF6\xF8-\xFF]+|[A-Z\xC0-\xD6\xD8-\xDE]+(?![a-z\xDF-\xF6\xF8-\xFF])|\d+/g;

module.exports = input => {	
    if (!input) return '';						
    if (input && typeof input !== 'string') input = String(input);
    return input.match(regex);
};