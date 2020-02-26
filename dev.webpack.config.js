const path = require('path');
// const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
  // entry: 'src/index.js',
  // mode: 'development',
  output: {
    path: path.join(__dirname, 'dev/'),
    publicPath: '',
    filename: 'bundle.js'
  },
  devServer: {
    hot: true,
    compress: true,
    contentBase: path.join(__dirname, 'dev'),
    port: 8080,
    after: function (app, server, compiler) {
      app.get('*.js*', function (req, res) {
        res.sendFile('dev/bundle.js')
      });
      app.get('*.css*', function (req, res) {
        res.sendFile(path.join(__dirname, 'dev/style.css'))
      });
      app.get('*', function (req, res) {
        res.sendFile(path.join(__dirname, 'dev/index.html'))
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
    // new HtmlWebpackPlugin({
    //   filename: "__index.html"
    // })
  ]
};