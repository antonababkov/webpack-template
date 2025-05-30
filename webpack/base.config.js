const path = require('path');
const multipage = require('./multipage.config')

const mode = process.env.NODE_ENV || 'development';
const devMode = mode === 'development';
const target = devMode ? 'web' : 'browserslist';
const devtool = devMode ? 'source-map' : undefined;

module.exports = {
    mode,
    target,
    devtool,
    devServer: {
        port: 3000,
        open: true,
        hot: true,
    },
    entry: { ...multipage.entry },
    output: {
        path: path.resolve(__dirname, '../dist'),
        clean: true,
        filename: '[name].[contenthash].js',
        assetModuleFilename: 'assets/[name][ext]'
    }
}