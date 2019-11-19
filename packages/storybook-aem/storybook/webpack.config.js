const webpack = require("webpack");
const path = require("path");
const WebpackLifecyclePlugin = require("./WebpackLifecyclePlugin");

const package = require("../package.json");
const aemConfig = package["storybook-aem"];

module.exports = async ({ config, mode }) => {
    // create new entry object to split AEM and Storybook builds
    config.entry = {
        main: [...config.entry]
    };

    // add sass build
    if (aemConfig.cssPreProcessor === "sass") {
        config.module.rules.push({
            test: /\.scss$/,
            use: [
                {
                    loader: "style-loader"
                    // loader: MiniCssExtractPlugin.loader
                },
                {
                    loader: "css-loader"
                },
                {
                    loader: "sass-loader"
                }
            ]
        });
    }

    // replace default template for preview window
    config.plugins[0].options.template = path.resolve(__dirname, "index.ejs");

    // run project webpack config to keep AEM up to date
    if (aemConfig.projectWebpackConfig) {
        config.plugins.push(
            new WebpackLifecyclePlugin({
                done: () => {
                    const config = require(aemConfig.projectWebpackConfig);

                    const compiler = webpack(Object.assign({}, config));

                    console.log("PROJECT BUILD: START");

                    compiler.run((err, stats) => {
                        console.log("PROJECT BUILD: COMPLETE");
                    });
                }
            })
        );
    }

    // uncomment for adding props to window
    // config.plugins.push(
    //     new webpack.DefinePlugin({
    //         aemConfig: JSON.stringify(aemConfig)
    //     })
    // );

    return config;
};
