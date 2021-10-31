const router = require('express').Router();
const ctrl = require('../controllers/')
const { Users } = require('../models/index.js');
const { Auth } = require('../middleware/index.js')



router.post('/create', Auth.encryptAndStorePassword, ctrl.users_create.createUser)

module.exports = router;