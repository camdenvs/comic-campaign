const path = require('path');
const WorkboxWebpackPlugin = require('workbox-webpack-plugin');

module.exports = {
    mode: 'production',
    entry: './server.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.js',
        publicPath: '/'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules)/,
                loader: 'babel-loader',
                options: { presets: ['@babel/env'] }
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: ['file-loader']
            },
            {
                test: /\.mjs$/,
                include: /node_modules/,
                type: "javascript/auto"
            }
        ]
    }
};
