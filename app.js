const express = require('express')
const Character = require('./db/Character')
const app = express()
const path = require('path')

app.use(express.static(path.join(__dirname, 'dist')))

module.exports = app
