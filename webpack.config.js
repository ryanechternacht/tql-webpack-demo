var webpack = require('webpack');

module.exports = {
    context: __dirname + "/dist",
    entry: "./app.js",
    output: {
        path: __dirname + "/webpack",
        filename: "bundle.js"
    }
}