const express = require('express')
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

const app = express()

app.set('view engine', 'ejs')
app.use(Cors(corsOption))
app.use(express.json())

// routes
app.get('/', (req, res) => {
  res.send('welcom to my api')
})

app.post('/send-custom-verification-email', async (req, res) => {
  const {userEmail, redirectUrl} = req.body

  const actionCodeSettings = {
    url: redirectUrl
  }
  
  try{
    const actionLink =  await getAuth()
    .generateEmailVerificationLink(userEmail, actionCodeSettings)
    const template = await ejs.renderFile('views/verify-email.ejs', {
      actionLink,
      randomNumber: Math.random()
    })
    await sendVerificationEmail(userEmail, template, actionLink)
    res.status(200).json({status: 'ok'})
  }catch(error){
    res.json({status:'error', error})
  }
})

// listener
app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`)
})