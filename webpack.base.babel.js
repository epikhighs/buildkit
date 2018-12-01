const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const path = require('path');
module.exports = {
  entry: __dirname + "/src/index.js",
  output: {
    path: __dirname + '/dist',
    filename: 'bundle.js',
    publicPath: '/' // public URL of the output directory when referenced in a browser
  },
  mode: 'development',
  module: {  // where we defined file patterns and their loaders
    rules: []
  },
  resolve: {
    alias: {
      src: path.join(__dirname, 'src'),
    },
  },
  plugins: [  // Array of plugins to apply to build chunk
    new HtmlWebpackPlugin({
      template: __dirname + "/src/index.ejs",
      inject: 'body'
    }),
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    contentBase: './src',  //source of static assets
    hot: true,
    open: true,
    overlay: true,
    port: 7700,
  },
  devtool: 'source-map',
};