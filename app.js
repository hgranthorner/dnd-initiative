const express = require('express')
const Character = require('./db/Character')
const app = express()
const path = require('path')

app.use(express.static(path.join(__dirname, 'dist')))
app.use(express.json())

app.get('/api/characters', (req, res, next) => {
  Character.findAll()
    .then(characters => res.send(characters))
    .catch(next)
})

app.post('/api/characters', (req, res, next) => {
  const { name, AC, max_HP, dex_modifier } = req.body
  console.log(req.body)
  Character.create({ name, AC: Number(AC), max_HP: Number(max_HP), dex_modifier: Number(dex_modifier) })
    .then(character => res.send(character))
    .catch(next)
})

app.delete('/api/characters/:id', (req, res, next) => {
  Character.destroy({ where: { id: req.params.id } })
    .then(() => res.sendStatus(204))
    .catch(next)
})

module.exports = app
