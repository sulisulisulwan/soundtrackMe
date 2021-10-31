const { Users } = require('../models/index.js');

const createUser = async (req, res) => {
  try {
    let { username, email } = req.body;
    let { salt, hash } = req.saltAndHash;
    await Users.create(username, email, salt, hash)
    res.sendStatus(201);
  } catch (err) {
    console.error(err.message);
    res.sendStatus(500);
  }
}

module.exports = {
  createUser
}