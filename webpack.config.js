var HtmlWebpackPlugin = require('html-webpack-plugin');
var HTMLWebpackPluginConfig = new HtmlWebpackPlugin({ template: './public/index.html' });
module.exports = {
  mode: 'development',
  entry: './src/main.js',
  output: {
    filename: './public/assets/js/bundle.js'
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader'
    }]
  },
  plugins: [HTMLWebpackPluginConfig]
};