const bcrypt = require('bcrypt')
const crypto = require('crypto');

const generateToken = async(req, res, next) => {

}

const encryptPassword = async(req, res, next) => {
  let { password } = req.body;
  try {
    const saltRounds = 10;
    let salt = await bcrypt.genSalt(saltRounds);
    let hash = await bcrypt.hash(password, salt);
    req.saltAndHash = { salt, hash };
    next();
  } catch(err) {
    console.error(err);
    next(err)
  }
}

const verifyUser = async(password, hash) => {
  try {
    return await bcrypt.compare(password, hash);
  } catch(err) {
    console.error(err);
  }
}

module.exports = {
  encryptPassword,
  verifyUser
}