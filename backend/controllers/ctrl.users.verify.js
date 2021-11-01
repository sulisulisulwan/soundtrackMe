const { Users } = require('../models');
const { Auth } = require('../middleware');

const verifyUser = async(req, res) => {
  try {
    if (req.isValid) {
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