const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')

const api = require('./routes/api.js')

const app = express()

app.use(bodyParser.json())
app.use('/api', api)
app.use(express.static(path.join(__dirname, 'public')))

app.listen(9000, () => {
  console.log('App started and available at http://localhost:9000')
})
