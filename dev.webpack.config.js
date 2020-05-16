const path = require('path');

const merge = require('webpack-merge');
const base = require('./base.webpack.config');

module.exports = merge(base, {
  mode: 'development',
  output: {
    filename: 'bundle.js',
    publicPath: '/',
    path: path.resolve(__dirname, 'dev')
  },
  devServer: {
    port: 8080,
    contentBase: path.join(__dirname, 'dev/'),
    historyApiFallback: true,

  },
});