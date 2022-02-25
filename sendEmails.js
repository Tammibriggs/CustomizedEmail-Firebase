const dotenv = require('./dotenvConfig')()
const sgMail = require('@sendgrid/mail')

const sendGridKey = process.env.SENDGRID_API_KEY
const verifiedEmail = process.env.EMAIL_USER
 
// Initialize SendGrid
sgMail.setApiKey(sendGridKey)

module.exports = function sendVerificationEmail(receiversEmail, template, link){
  const message = {
    from: {
      name: 'Test site@noreply',
      email: verifiedEmail
    },
    to: receiversEmail,
    subject: 'Verify your email address',
    text: `Hello Tammy \n Follow this link to verify your email address.
    ${link}\nif you didn't ask to verify this address, you can ignore this email.\nThanks.
    `,
    html: template
  }

  return sgMail.send(message)
}