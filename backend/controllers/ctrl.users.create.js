const { Users } = require('../models/index.js');
const { SendEmail } = require('../middleware/index.js')
const path = require('path');

const createUser = async (req, res) => {
  try {
    res.sendStatus(201);
  } catch (err) {
    console.error(err.message);
    res.sendStatus(500);
  }
}

const sendRequestConfirmationEmail = async (req, res) => {
  try {
    res.sendStatus(200)
  } catch(err) {
    console.error(err)
    res.sendStatus(500)
  }
}

const updateUserConfirmationStatus = async(req, res) => {
  let { username, email } = req.params
  try {
    Users.updateUserConfirmation(username, resetToken);
    res.status(204).redirect(`/users/create/confirmed/${username}?username=${username}&email=${email}`)
  } catch(err) {
    res.sendStatus(500);
  }
}

const sendUserCreatedNotificationEmail = async(req, res) => {
  try {
    res.status(200).redirect('/');
  } catch(err) {
    console.error(err)
    res.sendStatus(500)
  }
}


module.exports = {
  createUser,
  sendRequestConfirmationEmail,
  updateUserConfirmationStatus,
  sendUserCreatedNotificationEmail
}