const cryptoUtils = require('./utils/hash.utils.js')
const { Users }= require('../models');

const checkUserExists = async(req, res, next) => {
  let { username, email } = req.body;
  try {
    let userExists = await Users.getUsernameExists(username);
    if (userExists) {
      console.error('username already exists')
      res.sendStatus(400);
      return;
    }
    next();
  } catch (err) {
    console.error(err);
    return next(err)
  }
}

const compareUsernameAndEmail = async(req, res, next) => {
  let { username, email } = req.body;
  try {
    let usernameFromDB = await Users.getUsernameByEmail(email)
    if (usernameFromDB === undefined || !username === usernameFromDB.username) {
      console.error('username or email is invalid')
      res.sendStatus(400);
      return;
    }
    next()
  } catch(err) {
    return next(err)
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
    return next(err)
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
    return next(err)
  }
}

const encryptAndStorePassword = async(req, res, next) => {
  let { username, email, password } = req.body;
  try {
    let [ salt, hash ] = await cryptoUtils.encryptSaltAndHash(password)
    req.saltAndHash = { salt, hash };
    await Users.create(username, email, salt, hash)
    next();
  } catch(err) {
    return next(err)
  }
}

const verifyUser = async(req, res, next) => {

  let { username, password } = req.body;
  let results = await Users.get(username);
  let salt = results.salt
  let hash = results.hash
  try {
    let isValid = await cryptoUtils.compare(password, hash);
    req.isValid = isValid;
    next();
  } catch(err) {
    return next(err)
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