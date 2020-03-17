const fetchFromAEM = require('./fetchFromAEM');

const createPage = async config => {
    let url;
    if (typeof config === 'string') url = config;
    if (typeof config === 'object') url = `${config.aemContentPath}/${config.component}`;
    
    const response = await fetchFromAEM({
        url: `${url}?:operation=delete`,
        method: 'POST',
        errorMessage: 'Error creating page:'
    });
    
    if (await response.ok) return true;
    else return false;
};

module.exports = createPage;