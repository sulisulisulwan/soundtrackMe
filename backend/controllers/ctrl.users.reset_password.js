const { Users } = require('../models/index.js');
const path = require('path')
const { Nodemailer } = require('../middleware/index.js');

const requestPasswordChange = async(req, res) => {
  try {
    let { username, email } = req.body;
    let usernameFromDb = await Users.getUsernameByEmail(email)
    if (!(username === usernameFromDb)) {
      res.status(200).json('Sorry, username or email is invalid');
    } else {
      await Nodemailer.sendResetPassword(username, email);
      console.log(`sent and email to ${email}`)
    }

  } catch(err) {
    console.error(err.message);
    res.sendStatus(500);
  }
}

const  sendPasswordChangePage = async(req, res) => {
  let { username } = req.params;
  try {
    res.status(200).sendFile(path.resolve(__dirname, '../../frontend/public/reset-password.html'))
  } catch(err) {
    res.sendStatus(500)
  }
}

const changePassword = async (req, res) => {
  try {
    let { username } = req.body;
    let { salt, hash } = req.saltAndHash
    await Users.updateSaltAndHash(username, salt, hash)
    res.status(203).json('password updated');
  } catch(err) {
    console.error(err);
    res.sendStatus(500);
  }

}

module.exports = {
  requestPasswordChange,
  sendPasswordChangePage,
  changePassword
}