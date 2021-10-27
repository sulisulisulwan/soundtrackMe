const router = require('express').Router();
const path = require('path');
const { Auth, Nodemailer } = require('../middleware/index.js');
const { Users } = require('../models/index.js');
const ReactDOMServer = require('react-dom/server');
// const ResetPassword = require('../../frontend/client/src/ResetPassword.jsx');

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


//User sends request for password change:
router.post('/forgot', async(req, res) => {
  try {
    let { username, email } = req.body;
    let usernameFromDb = await Users.getUsernameByEmail(email)
    if (!(username === usernameFromDb)) {
      res.status(200).json('Sorry, username or email is invalid');
    } else {
      await Nodemailer(username, email);
      console.log(`sent and email to ${email}`)
    }

  } catch(err) {
    console.error(err.message);
    res.sendStatus(500);
  }
})

//User received password change email and clicks link:
router.get('/forgot/reset/:username', async(req, res) => {
  let { username } = req.params;
  try {
    res.status(200).sendFile(path.resolve(__dirname, '../../frontend/public/reset-password.html'))
  } catch(err) {
    res.sendStatus(500)
  }
})


//User changes and submits password to database:
router.post('/forgot/reset',  async (req, res, next) => {
  await Auth.encryptPassword(req, res)
  next();
}, async (req, res) => {
  try {
    let { username } = req.body;
    let { salt, hash } = req.saltAndHash
    await Users.updateSaltAndHash(username, salt, hash)
    res.status(203).json('password updated');
  } catch(err) {
    console.error(err);
    res.sendStatus(500);
  }
})

module.exports = router;