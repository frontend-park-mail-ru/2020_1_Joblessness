const path = require('path')
const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())

app.use(express.static('public'))
app.listen(
  process.env.HTTP_PORT,
  () => {
    console.log(`Server successfully started on port ${process.env.HTTP_PORT}`)
  }
)