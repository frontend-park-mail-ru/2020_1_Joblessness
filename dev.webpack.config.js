const path = require('path');
// const workboxPlugin = require('workbox-webpack-plugin');


// module.exports = {
//   // entry: 'src/index.js',
//   // mode: 'development',
//   output: {
//     filename: 'bundle.js',
//     publicPath: '/',
//     path: path.resolve(__dirname, 'dev')
//   },
//   devServer: {
//     port: 8080,
//     contentBase: path.join(__dirname, 'dev/'),
//     historyApiFallback: true,
//
//   },
//   module: {
//     rules: [
//       {
//         test: /\.pug$/,
//         use: "pug-loader"
//       },
//       // {
//       //   enforce: 'pre',
//       //   test: /\.js$/,
//       //   exclude: /node_modules/,
//       //   loader: 'eslint-loader',
//       //   options: {
//       //     fix: true,
//       //   },
//       // },
//       {
//         test: /\.js$/,
//         exclude: /node_modules/,
//         use: {
//           loader: 'babel-loader',
//           query: {
//             presets: ['@babel/preset-env']
//           }
//         }
//       },
//       {
//         test: /\.css$/i,
//         use: [
//           'style-loader',
//           'css-loader',
//         ],
//       },
//       {
//         test: /\.sc|ass$/,
//         use: [
//           {
//             loader: "style-loader" // creates style nodes from JS strings
//           },
//           {
//             loader: "css-loader" // translates CSS into CommonJS
//           },
//           {
//             loader: "sass-loader" // compiles Sass to CSS
//           }
//         ]
//       },
//       {
//         test: /\.(png|svg|jpg|gif)$/,
//         use: [
//           'file-loader',
//         ],
//       },
//     ]
//   },
//   plugins: [
//     new workboxPlugin.GenerateSW({
//       swDest: 'sw.js',
//       clientsClaim: true,
//       skipWaiting: true,
//     })
//   ]
// };

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