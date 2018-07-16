const HtmlWebPackPlugin = require('html-webpack-plugin');

const minificationOptions = {
    removeAttributeQuotes: true,
    collapseWhitespace: true,
    minifyCSS: true
};

const appHtmlPlugin = new HtmlWebPackPlugin({
    template: './app.html',
    filename: './app.html',
    minify: minificationOptions
});

const loginHtmlPlugin = new HtmlWebPackPlugin({
    template: './login.html',
    filename: './login.html',
    inject: false,
    minify: minificationOptions
});

module.exports = {
    context: __dirname + '/app',
    entry: './index.js',
    output: {
        path: __dirname + '/dist',
        filename: 'app.js'
    },
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
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            importLoaders: 1,
                            localIdentName: '[name]_[local]_[hash:base64]',
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
        contentBase: 'app',
        watchContentBase: true,
        index: 'login.html',
        proxy: {
            '/api/*': `http://localhost:${process.env['APP_PORT']}`
        }
    }
};
