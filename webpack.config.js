const path = require('path')
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin')

let minifiedOutput = process.env.WEBPACK_ENV === 'minified'

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: minifiedOutput ? 'gnosis.min.js' : 'gnosis.js',
        library: 'Gnosis'
    },
    plugins: [
        new LodashModuleReplacementPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [ 'style-loader', 'css-loader' ]
            },
            {
                test: /\/contracts\/\w+\.json$/,
                use: ['json-loader', 'json-x-loader?exclude=unlinked_binary+networks.*.events+networks.*.links']
            },
            {
                test: /\/gas-stats.json$/,
                use: ['json-loader', 'json-x-loader?exclude=*.*.data']
            },
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader'
            }
        ]
    },
    devtool: 'source-map',
    devServer: {
        contentBase: path.join(__dirname, 'examples')
    }
}
