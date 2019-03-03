const db = require('./db')

const Character = db.define('character', {
  player_name: db.Sequelize.TEXT,
  name: db.Sequelize.TEXT,
  dex_modifier: db.Sequelize.INTEGER,
  AC: db.Sequelize.INTEGER,
  max_HP: db.Sequelize.INTEGER
})

db.sync({ force: true})
  .then(async () => {
    await Promise.all([
      Character.create({ player_name: 'Grant', name: 'Lo-kag', dex_modifier: 2, AC: 17, Max_HP: 34 }), 
      Character.create({ player_name: 'Gil', name: 'Pipes', dex_modifier: 2, AC: 17, Max_HP: 34 }), 
      Character.create({ player_name: 'Carolyn', name: 'Pipes', dex_modifier: 2, AC: 17, Max_HP: 34 }), 
      Character.create({ player_name: 'Dylan', name: 'Clive', dex_modifier: 2, AC: 17, Max_HP: 34 }), 
      Character.create({ player_name: 'Greg', name: 'Finn', dex_modifier: 2, AC: 17, Max_HP: 34 }) 
    ])
  })
  .catch(e => console.log(`Failed to seed data. Here's why:\n${e}`))

module.exports = Character