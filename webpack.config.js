const HTMLWebpackPlugin = require('html-webpack-plugin')


module.exports = {
    entry: "./src/app.js",
    output: {
        path: __dirname + '/dist',
        filename: 'bundle.js',
    },
    plugins: [
        new HTMLWebpackPlugin()
    ]
}
