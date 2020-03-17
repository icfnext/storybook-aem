const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function expressMiddleware (router) {
    router.use('/content', createProxyMiddleware({
        target: 'http://admin:admin@localhost:4502',
        changeOrigin: true
    }));
    router.use('/etc.', createProxyMiddleware({
        target: 'http://admin:admin@localhost:4502',
        changeOrigin: true
    }));
}
