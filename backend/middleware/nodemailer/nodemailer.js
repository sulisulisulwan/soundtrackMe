const nodemailer = require('nodemailer');
require('dotenv').config({ path: __dirname + '/nodemailer.env' })

const sendEmail = async (username, toEmail, fromEmail, html) => {
  let transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    service: process.env.MAIL_SERVICE,
    secure: false,
    auth: {
      user: process.env.AUTH_USER,
      pass: process.env.AUTH_PW
    },
    logger: true
  })

  try {
    let info = await transporter.sendMail({
      from: fromEmail,
      to: toEmail,
      html: html
    })

    console.log('Message sent: %s', info.accepted);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  } catch(err) {
    console.error(err)
  }

}

module.exports = sendEmail;