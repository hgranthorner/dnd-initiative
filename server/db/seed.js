const Room = require('./Room')
const Character = require('./Character')
const db = require('./db')
const force = process.env.FORCE || false

Character.belongsTo(Room)
Room.hasMany(Character)

module.exports = () => {
  return db.sync({force})
    .then(async () =>{
      await Room.create({name: 'Tomb Of Annihilation'})
      await Promise.all([
        Character.create({ roomId: 1, player_name: 'Grant', name: 'Lo-kag', dex_modifier: 2, AC: 17, max_HP: 38}),
        Character.create({ roomId: 1, player_name: 'Gil', name: 'Pipes', dex_modifier: 1, AC: 12, max_HP: 28}),
        Character.create({ roomId: 1, player_name: 'Carolyn', name: 'Jack', dex_modifier: 3, AC: 14, max_HP: 32}),
        Character.create({ roomId: 1, player_name: 'Dylan', name: 'Clive', dex_modifier: 5, AC: 17, max_HP: 33}),
        Character.create({ roomId: 1, player_name: 'Greg', name: 'Finn', dex_modifier: 5, AC: 16, max_HP: 20}),
      ])
    })
}

