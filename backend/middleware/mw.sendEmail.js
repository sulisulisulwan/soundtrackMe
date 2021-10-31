const sendEmail = require('./nodemailer/nodemailer.js');

const resetPassword = async (username, userEmail) => {
  let fromEmail = '"SoundTrackMe" <reset.password@soundtrackMe.com>';
  let html = `
    <div>
      <p>Hi ${username}! You are receiving this email as you've forgotten your password for SoundtrackMe.</p>
      <p>Click <a href="${process.env.APP_PATH}users/reset-password/reset/${username}">here</a> to reset your password</p>
    </div>
  `;
  try {
    sendEmail(username, userEmail, )
  } catch (err) {
    console.error(err);
  }
}

const confirmUserCreated = async (username, userEmail) => {
  let fromEmail = '"SoundTrackMe" <create.account@soundtrackMe.com>';
  let html = `
    <div>
      <p>Hi ${username}! Welcome to SoundtrackMe ${username}!  </p>
      <p>Click <a href="${process.env.APP_PATH}users/created/confirmed/${username}">here</a> to confirm your new user account!</p>
    </div>
  `;
  try {
    sendEmail(username, userEmail)

  } catch(err) {
    console.error(err)
  }
}

module.exports = { resetPassword, confirmUserCreated };
