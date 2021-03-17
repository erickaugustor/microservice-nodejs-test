const HtmlWebpackPlugin = require('html-webpack-plugin'); 

module.exports = {
  mode: 'development',
  devServer: {
    port: 8081,
  },
  plugin: [
    new HtmlWebpackPlugin({
      template: './public/index.html'
    })
  ],
};