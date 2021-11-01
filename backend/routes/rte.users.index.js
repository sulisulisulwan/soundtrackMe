const router = require('express').Router();
const ctrl = require('../controllers')
const { Users } = require('../models');
const { Auth } = require('../middleware')



router.post('/create', Auth.encryptAndStorePassword, ctrl.users_create.createUser)

module.exports = router;