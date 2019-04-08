const express = require('express')
const { Character, Room } = require('./db')
const app = express()
const path = require('path')

app.use(express.static(path.join(__dirname, '..', 'client', 'dist')))
app.use(express.json())

app.get('/api/rooms/:id/characters', (req, res, next) => {
  const roomId = Number(req.params.id)
  Character.findAll( { where: { roomId }})
    .then(characters => res.send(characters))
    .catch(next)
})

app.post('/api/characters', (req, res, next) => {
  const { name, AC, max_HP, dex_modifier } = req.body
  Character.create({ name, AC: Number(AC), max_HP: Number(max_HP), dex_modifier: Number(dex_modifier) })
    .then(character => res.send(character))
    .catch(next)
})

app.delete('/api/characters/:id', (req, res, next) => {
  Character.destroy({ where: { id: req.params.id } })
    .then(() => res.sendStatus(204))
    .catch(next)
})

app.get('/api/rooms', (req, res, next) => {
  Room.findAll()
    .then(rooms => {
      res.send(rooms)
    })
    .catch(next)
})

app.post('/api/rooms', (req, res, next) => {
  const { name } = req.body
  Room.create({ name })
    .then(() => res.sendStatus(204))
    .catch(next)
})

app.delete('/api/rooms/:id', (req, res, next) => {
  Room.destroy({ where: { id: req.params.id } })
    .then(() => res.sendStatus(204))
    .catch(next)
})

module.exports = app
