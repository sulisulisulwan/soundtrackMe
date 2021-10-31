const { Users } = require('../models/index.js');
const { Auth } = require('../middleware/index.js');

const verifyUser = async(req, res) => {
  try {
    let { username, password } = req.body;
    let { salt, hash } = await Users.get(username);
    let isValid = await Auth.verifyUser(password, hash);
    if (isValid) {
      res.status(200).json('isValid')
    } else {
      res.status(200).json('isNotValid')
    }
  } catch(err) {
    console.error(err.message);
    res.sendStatus(500);
  }
}

module.exports = {
  verifyUser
}