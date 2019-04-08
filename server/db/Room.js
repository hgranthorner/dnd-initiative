const db = require('./db')

const Room = db.define('room', {
  name: {
    type: db.Sequelize.TEXT,
    allowNull: false
  },
  inCombat: {
    type: db.Sequelize.BOOLEAN,
    defaultValue: false
  }
})

module.exports = Room
