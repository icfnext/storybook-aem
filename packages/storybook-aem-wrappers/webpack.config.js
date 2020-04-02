var path = require("path");

module.exports = {
    mode: "production",
    entry: {
        "index" : "./src/index",
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
        'react-dom' : 'reactDOM'
    }
};
