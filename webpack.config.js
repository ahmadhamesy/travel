var path = require("path");
var HtmlWebackPlugin = require("html-webpack-plugin");
var MiniCssExtractPlugin = require("mini-css-extract-plugin");
var OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
var ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");
module.exports = {
    entry: {
        app:'./src/index.js'
    },
    output: {
        path: path.join(__dirname, "/dist"),
        publicPath:'',
        filename:"main.js",
    },
   
    mode:"development",


    devServer:{
        port:1231,
        open:true,
        static: path.join(__dirname, '/dist'),
      devMiddleware: {
        writeToDisk: true,
  },
    },
    module:{
        rules: [
            {
                test:/\.html$/,
                use:[
                    {
                        loader: "html-loader",
                        options:{
                            minimize: true,
                        }
                    }
                ]
            },
            {
                test:/\.(sa|sc|c)ss$/,
                use: [
                    {
                        loader:
                        MiniCssExtractPlugin.loader,
                        options:{
                            esModule:false,
                        },
                    },
                    "css-loader",
                    'sass-loader',
                ],
            },
           { 
            test:/\.(png|svg|gpe?g|gif)$/,
            use:[
                {
                loader: "file-loader",
                options:{
                    name: '[name].[ext]',
                    outputPath: "images",
                }
            }
            ]
           },
        ]
    },
    optimization: {
        minimizer: [
          "...",
          new ImageMinimizerPlugin({
            minimizer: {
              implementation: ImageMinimizerPlugin.squooshMinify,
            },
        }),
    ]
},
    plugins: [
        new HtmlWebackPlugin({
            filename: "index.html",
            template: "./src/index.html",
        }),
        new HtmlWebackPlugin({
            filename: "first.html",
            template: "./src/first.html",
        }),
        new HtmlWebackPlugin({
            filename: "second.html",
            template: "./src/second.html",
        }),
        new HtmlWebackPlugin({
            filename: "log.html",
            template: "./src/log.html",
        }),
        new HtmlWebackPlugin({
            filename: "sign.html",
            template: "./src/sign.html",
        }),
        new MiniCssExtractPlugin({filename: "css/style.css"}),
        new OptimizeCssAssetsPlugin({}),
    ]
    
};