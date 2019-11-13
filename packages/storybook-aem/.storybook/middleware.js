const proxy = require('http-proxy-middleware')

module.exports = function expressMiddleware (router) {
    router.use('/content', proxy({
        target: 'http://localhost:4502',
        changeOrigin: true
    }));
    router.use('/etc.', proxy({
        target: 'http://localhost:4502',
        changeOrigin: true
    }));
}