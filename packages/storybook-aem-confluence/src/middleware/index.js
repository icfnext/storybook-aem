const fetch = require('node-fetch').default;

module.exports = ConfluenceMiddleware = (config) => {
    if (config && config.baseUrl !== '' && config.username !== ''  && config.password !== '' ) {
        console.log(`[CM] Proxy Created for -> ${config.baseUrl}`);
    }
    return (req,res,next) => {
        if (!config) {
            console.log(`[CM] No Config passed. Aborting`);
            res.status(500).send('No Config');
        } else if (config && config.baseUrl !== '' && config.username !== ''  && config.password !== '' ) {
            const url = `${config.baseUrl}/rest/api/content/${req.params.id}?expand=body.view`;
            const options = {
                'headers': {
                    'Authorization': 'Basic ' + Buffer.from(config.username + ':' + config.password).toString('base64')
                }
            };

            fetch(url, options)
                .then(response => response.json())
                .then(json => {
                    if (json) res.json({ json: json });
                    else res.status(404).send('Not found');
                })
                .catch(e => {
                    console.error('\n\n\nfetch error:', e)
                    res.status(500).send('Something broke!');
                });
        }
    }
};