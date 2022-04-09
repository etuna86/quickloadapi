const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require("path");

module.exports = {
  entry:path.resolve(__dirname, "./src/index.js"),
  output: {
    filename: "js/app.js",
    path: path.resolve(__dirname, "dist"),
    publicPath: '/'
  },
  devServer: {
    historyApiFallback: true,

  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
    new MiniCssExtractPlugin({
      filename:"css/app.css",
    })
  ],
  resolve: {
    modules: [__dirname, "src", "node_modules"],
    extensions: ["*", ".js", ".jsx", ".tsx", ".ts"],  
  },
  module: {
    rules: [
      {
        test: /\.(js|mjs|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        loader: require.resolve("babel-loader"),
        options:{
          plugins: [ "@babel/plugin-transform-arrow-functions", "@babel/plugin-proposal-class-properties" ],
          }
      },
      {
        test: /\.s[ac]ss$/,
        //test: /\.(sa|sc|c)ss$/,
        exclude: /node_modules/,
        use:[
          MiniCssExtractPlugin.loader,
          "css-loader", 
          "postcss-loader", 
          "sass-loader" ,]
      },
      {
        test: /\.png|svg|jpg|ttf|woff|woff2|eot|otf|gif$/,
        use: ["file-loader"],
      },
    ],
  },
};
