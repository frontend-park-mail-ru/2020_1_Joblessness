const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');


module.exports = {
  //...
  // entry: 'src/index.js',
  output: {
    path: __dirname + '/public',
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    compress: true,
    port: 8080,
    before: function (app, server, compiler) {
      app.get('*.js*', function (req, res) {
        res.sendFile(path.join(__dirname, 'public/bundle.js'))
      });
      app.get('*.css*', function (req, res) {
        res.sendFile(path.join(__dirname, 'public/style.css'))
      });
      app.get('*', function (req, res) {
        res.sendFile(path.join(__dirname, 'public/index.html'))
      });
    },
  },
  module: {
    rules: [
      {
        test: /\.pug$/,
        use: "pug-loader"
      },
      {
        enforce: 'pre',
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
        options: {
          fix: true,
          failOnError: false,
          failOnWarning: false,
        },
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          query: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.css$/i,
        use: [
          'style-loader',
          MiniCssExtractPlugin.loader,
          'css-loader',
        ],
      },
      {
        test: /\.sc|ass$/,
        use: [
          {
            loader: "style-loader" // creates style nodes from JS strings
          },
          {
            loader: "css-loader" // translates CSS into CommonJS
          },
          {
            loader: "sass-loader" // compiles Sass to CSS
          }
        ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader',
        ],
      },
    ]
  },
  plugins: [
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
};