module.exports = {
    context: __dirname + "/src",
    entry: "./main",
    output: {
        path: __dirname + "/dist",
        filename: "app.js"
    },
    devtool: "cheap-module-eval-source-map",
    module: {
        loaders: [
        {
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel',
            query: {
                presets: ['es2015']
            }
        }
        ]
    }
}

