const router = require('express').Router();
const path = require('path');
const { Auth, Nodemailer } = require('../../middleware/index.js');
const { Users } = require('../../models/index.js');

router.post('/',  async (req, res, next) => {
  await Auth.encryptPassword(req, res)
  console.log(req.saltAndHash)
  next();
}, async (req, res) => {
  try {
    let { username, email } = req.body;
    let { salt, hash } = req.saltAndHash;
    await Users.create(username, email, salt, hash)
    res.sendStatus(201);
  } catch (err) {
    console.error(err.message);
    res.sendStatus(500);
  }
})

router.post('/verify', async(req, res) => {
  try {
    let { username, password } = req.body;
    let { salt, hash } = await Users.get(username);
    let isValid = await Auth.verifyUser(password, hash);
    if (isValid) {
      res.status(200).json('is valid')
    } else {
      res.status(200).json('is NOT valid')
    }
  } catch(err) {
    console.error(err.message);
    res.sendStatus(500);
  }
})



module.exports = router;