const HtmlWebpackPlugin = require('html-webpack-plugin'); 

module.exports = {
  mode: 'development',
  devServer: {
    port: 8080,
  },
  plugin: [
    new HtmlWebpackPlugin({
      template: './public/index.html'
    })
  ],
};