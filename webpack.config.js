const path = require('path');

module.exports = {
    mode: "development",
    entry: ['babel-polyfill', path.resolve(__dirname, 'frontend/src/index.js')],
    output: {
        // options related to how webpack emits results

        // where compiled files go
        path: path.resolve(__dirname, "frontend/static/public/"),

        // 127.0.0.1/static/frontend/public/ where files are served from
        publicPath: "/frontend/static/public/",
        filename: 'main.js',  // the same one we import in index.html
    },
    module: {
        // configuration regarding modules
        rules: [
        { test: /\.css$/, loader: "style-loader!css-loader" },
          { test: /\.png$/, loader: "url-loader?limit=100000" },
          { test: /\.jpg$/, loader: "file-loader" },
            {
                // regex test for js and jsx files
                test: /\.(js|jsx)?$/,

                // don't look in the node_modules/ folder
                exclude: /node_modules/,
                // for matching files, use the babel-loader
                use: {
                    loader: "babel-loader",
                    options: {presets: ["@babel/env"]}
                },
            },
        ],
    },
};