const router = require('express').Router();
const ctrl = require('../controllers/')
const path = require('path');
const { Users } = require('../models/index.js');
const { Auth, Nodemailer } = require('../middleware/index.js')



router.post('/', Auth.encryptPassword, ctrl.users.createUser)

module.exports = router;