var path = require('path');

module.exports = {
  entry: "./static/modules/App.js",
  output: {
      path: __dirname + '/static/public/webpack_output',
      filename: "bundle.js"
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
        loader: 'url-loader'
      },
    ]
  }
};
