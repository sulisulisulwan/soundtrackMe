const bcrypt = require('bcrypt')
const crypto = require('crypto')

const compare = async(password, hash) => {
  return await bcrypt.compare(password, hash)
}

const generateRandomHash = () => {
  return new Promise((resolve, reject) => {
    crypto.randomBytes(48, function(err, buffer) {
      if (err) {
        reject (new Error(err));
      }
      resolve(buffer.toString('hex'));
    });
  });
};

const encryptSaltAndHash = async(string) => {
  const saltRounds = 10;
  let salt = await bcrypt.genSalt(saltRounds);
  let hash = await bcrypt.hash(string, salt);
  return  [ salt, hash ]
}

module.exports = {
  generateRandomHash,
  encryptSaltAndHash,
  compare
}