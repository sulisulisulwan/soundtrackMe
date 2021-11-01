const sendEmail = require('./nodemailer/nodemailer.js');

const resetPassword = async (req, res, next) => {
  let { username, email } = req.body;
  let { resetToken } = req;
  let fromEmail = '"SoundTrackMe" <reset.password@soundtrackMe.com>';
  let html = `
    <div>
      <p>Hi ${username}! You are receiving this email as you've forgotten your password for SoundtrackMe.</p>
      <p>Click <a href="${process.env.APP_PATH}users/reset-password/reset/${username}?username=${username}&token=${resetToken}&email=${email}">here</a> to reset your password.</p>
      <p>This link will be valid for 60 seconds</p>
    </div>
  `;
  try {
    sendEmail(username, email, fromEmail, html)
    next()
  } catch (err) {
    return next(err)
  }
}

const confirmUserCreated = async (req, res, next) => {
  let { username, email } = req.query;
  let fromEmail = '"SoundTrackMe" <create.account@soundtrackMe.com>';
  let html = `
    <div>
      <p>Hi ${username}! Welcome to SoundtrackMe ${username}!  </p>
      <p>Click <a href="${process.env.APP_PATH}users/create/confirmed/${username}?username=${username}&email=${email}">here</a> to confirm your new user account!</p>
    </div>
  `;
  try {
    sendEmail(username, email, fromEmail, html);
    next();
  } catch(err) {
    return next(err)
  }
}

const notifyUserCreated = async(req, res, next) => {
  let { username, email } = req.query;
  let fromEmail = '"SoundTrackMe" <create.account@soundtrackMe.com>';
  let html = `
    <div>
      <p>Hi ${username}! You've successfully created a user account with SoundtrackMe!</p>
      <p>Click <a href="${process.env.APP_PATH}">here</a> to go to the SoundtrackMe homepage.</p>
    </div>
  `;
  try {
    sendEmail(username, email, fromEmail, html);
    next();
  } catch(err) {
    return next(err)
  }
}

module.exports = { resetPassword, confirmUserCreated, notifyUserCreated };
