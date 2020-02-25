var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');


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

      app.get('/user', function (req, res) {
        res.sendFile(path.join(__dirname,'public/index.html'))
      });
      app.get('/vacancies', function (req, res) {
        res.sendFile(path.join(__dirname,'public/index.html'))
      });
      app.get('/vacancies/create', function (req, res) {
        res.sendFile(path.join(__dirname,'public/index.html'))
      });
      app.get('/index', function (req, res) {
        res.sendFile(path.join(__dirname,'public/index.html'))
      });
      app.get('/summaries/create', function (req, res) {
        res.sendFile(path.join(__dirname,'public/index.html'))
      });
      app.get('/login', function (req, res) {
        res.sendFile(path.join(__dirname,'public/index.html'))
      });
      app.get('/signup', function (req, res) {
        res.sendFile(path.join(__dirname,'public/index.html'))
      });
      app.get('/signup/employer', function (req, res) {
        res.sendFile(path.join(__dirname,'public/index.html'))
      });
      app.get('/signup/employee', function (req, res) {
        res.sendFile(path.join(__dirname,'public/index.html'))
      });
      app.get('/users/*', function (req, res) {
        res.sendFile(path.join(__dirname,'public/index.html'))
      });
      app.get('/vacancies/*', function (req, res) {
        res.sendFile(path.join(__dirname,'public/index.html'))
      });
      app.get('/summaries/*', function (req, res) {
        res.sendFile(path.join(__dirname,'public/index.html'))
      });
      app.get('/404', function (req, res) {
        res.sendFile(path.join(__dirname,'public/index.html'))
      });
    },
  },
  module: {
    rules : [
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
        test : /\.js$/,
        exclude: /node_modules/,
        use: {
          loader : 'babel-loader',
          query : {
            presets : [ '@babel/preset-env' ]
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
        test : /\.(png|svg|jpg|gif)$/,
        use : [
          'file-loader',
        ],
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "__index.html"
    })
  ]
}