const app = require('./app')
const { seed } = require('./db')

const port = process.env.PORT || 3000

seed()
  .then(() =>
    app.listen(port, () => { console.log(`Listening on port ${port}...`)})
  )
  .catch(e => console.log('Failed to sync. Heres why:\n', e))

