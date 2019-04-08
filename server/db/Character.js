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

module.exports = Character
