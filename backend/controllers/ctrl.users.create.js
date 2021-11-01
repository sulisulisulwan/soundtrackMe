const { Users } = require('../models');
const { SendEmail } = require('../middleware')
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
  let { username, email } = req.query
  console.log('username is', username, 'email', email)
  try {
    await Users.updateUserConfirmation(username);
    res.status(204).redirect(`/users/create/confirmed/${username}/notify?username=${username}&email=${email}`)
  } catch(err) {
    console.error(err)
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