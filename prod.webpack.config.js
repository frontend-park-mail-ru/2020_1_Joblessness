const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

// module.exports = {
  //...
  // entry: 'src/index.js',
  // output: {
  //   path: __dirname + '/public',
  //   filename: "./bundle.js",
  // },
  // module: {
  //   rules: [
  //     {
  //       test: /\.pug$/,
  //       use: "pug-loader"
  //     },
  //     // {
  //     //   enforce: 'pre',
  //     //   test: /\.js$/,
  //     //   exclude: /node_modules/,
  //     //   loader: 'eslint-loader',
  //     //   options: {
  //     //     fix: true,
  //     //   },
  //     // },
  //     {
  //       test: /\.js$/,
  //       exclude: /node_modules/,
  //       use: {
  //         loader: 'babel-loader',
  //         query: {
  //           presets: ['@babel/preset-env']
  //         }
  //       }
  //     },
  //     {
  //       test: /\.css$/i,
  //       use: [
  //         'style-loader',
  //         MiniCssExtractPlugin.loader,
  //         'css-loader',
  //       ],
  //     },
  //     {
  //       test: /\.sc|ass$/,
  //       use: [
  //         {
  //           loader: "style-loader" // creates style nodes from JS strings
  //         },
  //         {
  //           loader: "css-loader" // translates CSS into CommonJS
  //         },
  //         {
  //           loader: "sass-loader" // compiles Sass to CSS
  //         }
  //       ]
  //     },
  //     {
  //       test: /\.(png|svg|jpg|gif)$/,
  //       use: [
  //         'file-loader',
  //       ],
  //     },
  //   ]
  // },
  // plugins: [
  //   new CleanWebpackPlugin(),
  //   new HtmlWebpackPlugin({
  //     hash: true,
  //     filename: __dirname + '/public/index.html',
  //     title: 'Ха-ха.ру',
  //     template: __dirname + '/src/index.html',
  //   }),
  //   new MiniCssExtractPlugin({
  //     filename: 'style.css',
  //   }),
  // ]
// };

const merge = require('webpack-merge');
const base = require('./base.webpack.config');

module.exports = merge(base, {
  mode: 'production',
  output: {
    path: __dirname + '/public',
    filename: "./bundle.js",
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      hash: true,
      filename: __dirname + '/public/index.html',
      title: 'Ха-ха.ру',
      template: __dirname + '/src/index.html',
    }),
    new MiniCssExtractPlugin({
      filename: 'style.css',
    }),
  ]
});