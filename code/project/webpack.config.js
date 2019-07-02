const path = require('path');

module.exports = {
  entry: './src.js',
  output: {
    path: path.resolve(__dirname, 'public/dist'),
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    compress: true,
    port: 9000,
    open: true
  },
  mode: 'development',
  devtool: 'source-map'
};