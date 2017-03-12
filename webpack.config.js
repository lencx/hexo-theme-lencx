'use strict';
const webpack = require('webpack')
const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const AssetsPlugin = require('assets-webpack-plugin')
const shell = require('shelljs')

const rules = []
const plugins = []

// DEV
const buildPath = 'source/dist'
// process.traceDeprecation = true

function resolve(dirPath) {
    return path.resolve(__dirname, dirPath)
}

shell.rm('-rf', resolve(buildPath))
shell.mkdir('-p', resolve(buildPath))
shell.config.silent = true
shell.cp('-R', 'dist/*', resolve(buildPath))
shell.config.silent = false

plugins.push(
    new AssetsPlugin({
        filename: 'asset.json',
        prettyPrint: true,
        includeManifest: 'manifest'
    })
)

// js
rules.push({
    test: /\.js$/,
    use: [{
        loader: 'babel-loader',
        // https://github.com/webpack/loader-utils/issues/56
        options: {presets: ['es2015']}
    }]
})
// css
rules.push({
    test: /\.scss$/,
    use: ExtractTextPlugin.extract({
        use: [
            'css-loader?importLoaders=1',
            'sass-loader?sourceMap',
            'postcss-loader'
        ]
    })
})
plugins.push(
    new ExtractTextPlugin('[name].[contenthash:12].css')
)

module.exports = {
    entry: resolve('source/js/main.js'),
    output: {
        path: resolve(buildPath),
        filename: 'main.[chunkhash:12].js'
    },
    devtool: 'source-map',
    plugins: plugins,
    module: {
        rules
    }
}