const { Users } = require('../models/index.js');
const { SendEmail } = require('../middleware/index.js')
const path = require('path');

const createUser = async (req, res) => {
  try {
    let { username, email } = req.body;
    let userExists = await Users.getUsernameExists(username);
    if (userExists) {
      throw new Error('username already exists')
    }
    let { salt, hash } = req.saltAndHash;
    await Users.create(username, email, salt, hash)
    res.sendStatus(201);
  } catch (err) {
    console.error(err.message);
    res.sendStatus(500);
  }
}

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
  createUser,
  getUserCreatedEmailConfirmation,
  updateUserConfirmationStatus
}