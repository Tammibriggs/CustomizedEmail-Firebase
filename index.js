const express = require('express')
const Cors = require('cors')
const dotenv = require('./dotenvConfig')()

const corsOption = {
  origin: '*',
  optionsSuccessStatus: 200
}

const PORT = process.env.PORT || 8000

const app = express()
app.use(Cors(corsOption))
app.use(express.json())

// routes
app.get('/', (req, res) => {
  res.status(200).send('Welcome to my API')
})


// listener
app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`)
})