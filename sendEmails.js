const dotenv = require('./dotenvConfig')()
const sgMail = require('@sendgrid/mail')

const sendGridKey = process.env.SENDGRID_API_KEY
const verifiedEmail = process.env.VERIFIED_SENDER
 
// Initialize SendGrid
sgMail.setApiKey(sendGridKey)

module.exports = function sendVerificationEmail(userEmail, template, actionLink){
  const message = {
    from: {
      name: 'Test site@noreply',
      email: verifiedEmail
    },
    to: userEmail,
    subject: 'Verify your email address',
    text: `Please verify you email\n
      We need to confirm that this is you. Click the link below to verify your email address\n
      ${actionLink}
    `,
    html: template
  }

  return sgMail.send(message)
}