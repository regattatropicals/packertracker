const HtmlWebPackPlugin = require('html-webpack-plugin');

const minificationOptions = {
    removeAttributeQuotes: true,
    collapseWhitespace: true,
    minifyCSS: true
};

const appHtmlPlugin = new HtmlWebPackPlugin({
    template: './static/app.html',
    filename: './app.html',
    minify: minificationOptions
});

const loginHtmlPlugin = new HtmlWebPackPlugin({
    template: './static/login.html',
    filename: './login.html',
    inject: false,
    minify: minificationOptions
});

module.exports = {
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: "style-loader"
                    },
                    {
                        loader: "css-loader",
                        options: {
                            modules: true,
                            importLoaders: 1,
                            localIdentName: "[name]_[local]_[hash:base64]",
                            sourceMap: true,
                            minimize: true
                        }
                    }
                ]
            }
        ]
    },

    plugins: [ appHtmlPlugin, loginHtmlPlugin ],

    devServer: {
        https: true,
        contentBase: 'dist',
        watchContentBase: true,
        index: 'login.html',
        proxy: {
            '/api/*': 'http://localhost:33456'
        }
    }
};
