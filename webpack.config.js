const HtmlWebPackPlugin = require('html-webpack-plugin');

const minificationOptions = {
    removeAttributeQuotes: true,
    collapseWhitespace: true,
    minifyCSS: true
};

const appHtmlPlugin = new HtmlWebPackPlugin({
    template: './index.html',
    filename: './index.html',
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
    entry: './app.js',
    output: {
        publicPath: '/',
        path: __dirname + '/dist',
        filename: 'static/app.[hash].js'
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
        proxy: {
            '/api/*': `http://localhost:${process.env['APP_PORT']}`
        },
        publicPath: '/',
        historyApiFallback: {
            index: '/index.html'
        }
    }
};
