var path = require("path");

const config = {
    mode: "production",
    output: {
        path: path.resolve("lib"),
        filename: "[name].js",
        libraryTarget: "commonjs2"
    },
    module: {
        rules: [
            {
                test: /\.js?$/,
                exclude: /(node_modules)/,
                use: "babel-loader"
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
        ]
    },
    externals: {
        'react': 'react',
        'react-dom' : 'reactDOM',
        '@storybook/addons': '@storybook/addons',
        '@storybook/api': '@storybook/api',
        '@storybook/components': '@storybook/components',
        '@storybook/core-events': '@storybook/core-events'
    }
};

const browserConfig = Object.assign({}, config, {
    entry: {
        "index" : "./src/index",
        "register" : "./src/register/index",
    }
});

const middlewareConfig = Object.assign({}, config, {
    entry: {
        "middleware" : "./src/middleware/index",
    },
    target: "node"
});

module.exports = [ browserConfig, middlewareConfig ];