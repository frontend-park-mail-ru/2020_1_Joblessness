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
    port: 8080
  },
  module: {
    rules : [
      {
        test: /\.pug$/,
        use: "pug-loader"
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
