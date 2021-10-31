const { Users } = require('../models/index.js');
const { SendEmail } = require('../middleware/index.js')
const path = require('path');

const getUserCreatedEmailConfirmation = async (req, res) => {
  let { username, email } = req.query
  try {
    await SendEmail.confirmUserCreated(username, email);
    res.sendStatus(200)
  } catch(err) {
    console.error(err)
    res.sendStatus(500)
  }
}

const updateUserConfirmationStatus = async(req, res) => {
  let { username } = req.params
  try {
    Users.updateUserConfirmation(username);
    res.status(200).redirect('/')
  } catch(err) {
    res.sendStatus(500);
  }
}


module.exports = {
  getUserCreatedEmailConfirmation,
  updateUserConfirmationStatus
}