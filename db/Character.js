const db = require('./db')

const Character = db.define('character', {
  player_name: {
    type: db.Sequelize.TEXT,
    defaultValue: 'DM'
  },
  name: db.Sequelize.TEXT,
  dex_modifier: db.Sequelize.INTEGER,
  AC: db.Sequelize.INTEGER,
  max_HP: db.Sequelize.INTEGER,
  initiative: db.Sequelize.INTEGER
})

db.sync({ force: true })
  .then(async () => {
    await Promise.all([
      Character.create({ player_name: 'Grant', name: 'Lo-kag', dex_modifier: 2, AC: 17, max_HP: 34 }),
      Character.create({ player_name: 'Gil', name: 'Pipes', dex_modifier: 1, AC: 12, max_HP: 28 }),
      Character.create({ player_name: 'Carolyn', name: 'Jack', dex_modifier: 3, AC: 14, max_HP: 32 }),
      Character.create({ player_name: 'Dylan', name: 'Clive', dex_modifier: 5, AC: 16, max_HP: 33 }),
      Character.create({ player_name: 'Greg', name: 'Finn', dex_modifier: 5, AC: 16, max_HP: 20 })
    ])
  })
  .catch(e => console.log(`Failed to seed data. Here's why:\n${e}`))

module.exports = Character
