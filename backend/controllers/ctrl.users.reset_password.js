const path = require('path')
const { Users } = require('../models/index.js');
const { SendEmail } = require('../middleware/index.js');

const requestPasswordChange = async(req, res) => {
  try {
    res.sendStatus(200);
  } catch(err) {
    console.log('HELLLOOOOOOO')
    if (err.message === 'username or email is invalid') {
      res.sendStatus(400).json('username or email is invalid')
    } else {
      res.sendStatus(500);
    }
  }
}

const  sendPasswordChangePage = async(req, res) => {
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