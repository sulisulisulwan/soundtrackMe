const nodemailer = require('nodemailer');
require('dotenv').config({ path: __dirname + '/.env' })

const sendEmail = async (username, email) => {
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

  let info = await transporter.sendMail({
    from: '"SoundtrackMe" <soundtrackMe@soundtrackMe.com>',
    to: process.env.SENDTO_TEST,
    html: `
      <div>
        <p>Hi ${username}! You are receiving this email as you've forgotten your password for SoundtrackMe.</p>
        <p>Click <a href="http://localhost:1337/users/forgot/reset/${username}">here</a> to reset your password</p>
      </div>


    `

  })

  console.log('Message sent: %s', info.accepted);

  console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
}

module.exports = sendEmail;