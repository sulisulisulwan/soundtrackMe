const nodemailer = require('nodemailer');

const sendEmail = async (username, email) => {
  let senderMail = 'sulitestsulitest@gmail.com'
  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    service: 'gmail',
    secure: false,
    auth: {
      user: senderMail,
      pass: 'cacbo6-qehkyR-soxboc'
    },
    logger: true
  })

  let info = await transporter.sendMail({
    from: '"SoundtrackMe" <soundtrackMe@soundtrackMe.com>',
    to: 'sulimantekalli@gmail.com',
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