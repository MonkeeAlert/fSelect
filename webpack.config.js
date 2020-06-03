const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    entry: {
        main: "./src/js/fSelect.js"
    },
    output: {
        filename: 'fSelect.js',
        libraryTarget: 'umd',
        globalObject: "this"
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: "babel-loader"
                    }
                ]
            },
            {
                test: /\.sass|scss$/,
                exclude: /node_modules/,
                use: [
                    MiniCssExtractPlugin.loader, 
                    {
                        loader: "css-loader",
                        options: {
                            importLoaders: 1,
                        }
                    },
                    'sass-loader'
                ]
            },
            {
                test: /\.(gif|png|jpe?g|svg)$/i,
                use: [
                    "file-loader",
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            disable: true
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'fSelect.css',
            chunkFilename: 'fSelect.[hash].css',
        })
    ],
    resolve: {
        extensions: [ '.js', '.scss' ]
    }
};