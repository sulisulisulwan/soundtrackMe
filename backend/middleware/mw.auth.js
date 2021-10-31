const cryptoUtils = require('./utils/hash.utils.js')
const { Users }= require('../models');

const checkUserExists = async(req, res, next) => {
  let { username, email } = req.body;
  try {
    let userExists = await Users.getUsernameExists(username);
    if (userExists) {
      throw new Error('username already exists')
    }
    next();
  } catch (err) {
    console.error(err);
    next(err);
  }
}

const compareUsernameAndEmail = async(req, res, next) => {
  let { username, email } = req.body;
  try {
    let usernameFromDB = await Users.getUsernameByEmail(email)
    if (!(username === usernameFromDB.username)) {
      throw new Error('username or email is invalid')
    }
    next()
  } catch(err) {
    next(err);
  }

}

const compareResetTokens = async(req, res, next) => {
  let { username, token } = req.query
  try {
    let tokenFromDB = await Users.getResetSaltAndHash(username);
    if (token !== tokenFromDB.resetToken) {
      throw new Error('Invalid or expired token') //THIS ERROR DOESN'T GET PASSED TO WHERE IT SHOULD BE IN THE CONTROLLER
    }
    next();
  } catch(err) {
    console.error(err);
    next(err);
  }
}

const updateResetPasswordToken = async(req, res, next) => {
  try {
    let { username } = req.body;
    let hash = await cryptoUtils.generateRandomHash();
    let [ resetSalt, resetToken ] = await cryptoUtils.encryptSaltAndHash(hash)
    req.resetToken = resetToken
    await Users.updateResetSaltAndHash(username, resetSalt, resetToken);
    next();
  } catch(err) {
    next(err);
  }
}

const encryptAndStorePassword = async(req, res, next) => {
  let { username, email, password } = req.body;
  try {
    let { salt, hash } = await cryptoUtils.encryptSaltAndHash(password)
    req.saltAndHash = { salt, hash };
    await Users.create(username, email, salt, hash)
    next();
  } catch(err) {
    console.error(err);
    next(err)
  }
}

const verifyUser = async(password, hash) => {
  try {
    return await cryptoUtils.compare(password, hash);
  } catch(err) {
    console.error(err);
  }
}

module.exports = {
  updateResetPasswordToken,
  encryptAndStorePassword,
  checkUserExists,
  compareResetTokens,
  compareUsernameAndEmail,
  verifyUser
}