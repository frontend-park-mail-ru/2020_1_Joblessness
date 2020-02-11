var path = require('path');

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
          // 'handlebars-loader', // handlebars loader expects raw resource string
          // 'extract-loader',
        ],
      },
    ]
  }
}