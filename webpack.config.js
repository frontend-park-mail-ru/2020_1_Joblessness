var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
const user = {
  user: {
    firstname : 'Михаил',
    lastname : 'Балицкий',
    tag: '@mikstime',
    avatar: 'data:image/jpeg;base64,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'
  },
  summaries : [
    {
      title: "Резюме на должность веб разработчика",
      contacts : {
        firstname: "Михаил",
        lastname: "Балицкий",
        mobile: 89250499222,
        city: "Moscow",
      },
      info : {
        birth : {
          year : 2000,
          month : 5,
          day : 4,
        },
        sex : "man",
        country: "Российская Федерация",
        experience: "Опыт работы в компаниях отсутстует",
      },
      education : [
        {
          degree : "МГТУ"
        }
      ]
    },
    {
      title: "Резюме на должность веб разработчика",
      contacts : {
        firstname: "Михаил",
        lastname: "Балицкий",
        mobile: 89250499222,
        city: "Moscow",
      },
      info : {
        birth : {
          year : 2000,
          month : 5,
          day : 4,
        },
        sex : "man",
        country: "Российская Федерация",
        experience: "Опыт работы в компаниях отсутстует",
      },
      education : [
        {
          degree : "МГТУ"
        }
      ]
    },
    {
      title: "Резюме на должность веб разработчика",
      contacts : {
        firstname: "Михаил",
        lastname: "Балицкий",
        mobile: 89250499222,
        city: "Moscow",
      },
      info : {
        birth : {
          year : 2000,
          month : 5,
          day : 4,
        },
        sex : "man",
        country: "Российская Федерация",
        experience: "Опыт работы в компаниях отсутстует",
      },
      education : [
        {
          degree : "МГТУ"
        }
      ]
    },
    {
      title: "Резюме на должность веб разработчика",
      contacts : {
        firstname: "Михаил",
        lastname: "Балицкий",
        mobile: 89250499222,
        city: "Moscow",
      },
      info : {
        birth : {
          year : 2000,
          month : 5,
          day : 4,
        },
        sex : "man",
        country: "Российская Федерация",
        experience: "Опыт работы в компаниях отсутстует",
      },
      education : [
        {
          degree : "МГТУ"
        }
      ]
    }
  ]
}
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
        res.sendfile(path.join(__dirname,'public/index.html'))
      });
      app.get('/vacancies/create', function (req, res) {
        res.sendfile(path.join(__dirname,'public/index.html'))
      });
      app.get('/index', function (req, res) {
        res.sendfile(path.join(__dirname,'public/index.html'))
      });
      app.get('/summaries/create', function (req, res) {
        res.sendfile(path.join(__dirname,'public/index.html'))
      });
      app.get('/login', function (req, res) {
        res.sendfile(path.join(__dirname,'public/index.html'))
      });
      app.get('/signup', function (req, res) {
        res.sendfile(path.join(__dirname,'public/index.html'))
      });
      app.get('/signup/employer', function (req, res) {
        res.sendfile(path.join(__dirname,'public/index.html'))
      });
      app.get('/signup/employee', function (req, res) {
        res.sendfile(path.join(__dirname,'public/index.html'))
      });
      app.get('/404', function (req, res) {
        res.sendfile(path.join(__dirname,'public/index.html'))
      });
      app.post('/api/setAvatar', function (req, res) {
        res.json(user)
      });
      app.get('/api/userPage', function (req, res) {
        res.json(user);
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