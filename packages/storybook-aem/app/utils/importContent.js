const fetchFromAEM = require('./fetchFromAEM');

const importContent = async (url,content) => {
    const params = [
        `:operation=import`,
        `:contentType=json`,
        `:replace=true`,
        `:replaceProperties=true`,
        `:content=${JSON.stringify(content)}`,
    ];

    const response = await fetchFromAEM({
        url: `${url}?${params.join('&')}`,
        method: 'POST',
        errorMessage: 'Error creating JCR:Content:'
    });

    if (await response.ok) return true;
    else return false;
};

module.exports = importContent;