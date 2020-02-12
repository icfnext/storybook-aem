const fetch = require('node-fetch').default;

module.exports = QTestMiddleware = (config) => {
    if (config && config.baseUrl !== '' && config.username !== ''  && config.password !== '' ) {
        console.log(`[QT] Proxy Created for -> ${config.baseUrl}`);
    }
    return (req,res,next) => {
        if (!config) {
            console.log(`[QT] No Config passed. Aborting`);
            res.status(500).send('No Config');
        } else if (config && config.baseUrl !== '' && config.username !== ''  && config.password !== '' ) {
            const url = `${config.baseUrl}/test-cases/${req.params.id}?expand=teststep`;
            const options = {
                'headers': {
                    'Authorization': 'Basic ' + Buffer.from(config.username + ':' + config.password).toString('base64')
                }
            };

            fetch(url, options)
                .then(response => {
                    console.log('response:', response)
                    return response.json()
                })
                .then(json => {
                    console.log('json:', json)
                    if (json) res.json({ json: json });
                    else res.status(404).send('Not found');
                })
                .catch(e => {
                    console.error('\n\n\nfetch error:', e)
                    res.status(500).send();
                });
        }
    }
};