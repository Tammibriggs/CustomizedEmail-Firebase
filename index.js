const app = require('express')()
const Cors = require('cors')
const dotenv = require('./dotenvConfig')()
const admin = require("firebase-admin")
const serviceAccount = require('./serviceAccountKey.js')
const {getAuth} = require("firebase-admin/auth")
const ejs = require('ejs')
const sendVerificationEmail = require('./sendEmails')

const corsOption = {
  origin: '*',
  optionsSuccessStatus: 200
}

const PORT = process.env.PORT || 8000

const adminApp = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
})

app.set('view engine', 'ejs')

app.use(Cors(corsOption))

// routes
app.get('/send-custom-verification-email', (req, res) => {
  const userEmail = 'godsfirstbriggs@gmail.com'
  const actionCodeSettings = {
      url: 'https://www.example.com/'
  }

  getAuth()
  .generateEmailVerificationLink(userEmail, actionCodeSettings)
  .then((link) => {
      ejs.renderFile('views/verify-email.ejs', {
        usersName: 'Tammibriggs',
        link,
        randomNumber: Math.random()
      })
      .then((template) => {
        sendVerificationEmail(userEmail, template, link)
          .then(() => {
              res.status(200).json({status: 'ok'})
          })
          .catch((error) => {
              res.status(500).json({status: 'error', error})
          })
      }).catch(error => {
          res.status(500).json({status:'error', error})
      })
    })
    .catch((error) => {
      res.status(500).json({status:'error', error: error})
    })
})

// listener
app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`)
})