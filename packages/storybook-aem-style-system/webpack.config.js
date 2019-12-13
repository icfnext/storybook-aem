var path = require("path");

module.exports = {
    mode: "production",
    entry: {
        "index" : "./src/index",
        "register" : "./src/register/index",
    },
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
            }
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
