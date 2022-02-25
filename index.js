const app = require('express')()
const Cors = require('cors')
const dotenv = require('./dotenvConfig')()

const corsOption = {
  origin: '*',
  optionsSuccessStatus: 200
}

// configs
const PORT = process.env.PORT || 8000

// middlewares
app.use(Cors(corsOption))

// routes

app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`)
})