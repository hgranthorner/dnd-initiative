const express = require('express')
const Character = require('./db/Character')
const app = express()
const path = require('path')

app.use(express.static(path.join(__dirname, 'dist')))

app.get('/api/characters', (req, res, next) => {
  Character.findAll()
    .then(characters => res.send(characters))
    .catch(next)
})

module.exports = app
