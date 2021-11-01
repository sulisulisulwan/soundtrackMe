const router = require('./rte.users.reset_password.js')
const ctrl = require('../controllers')
const { Users } = require('../models');
const { Auth } = require('../middleware')

router.post('/verify', Auth.verifyUser, ctrl.users_verify.verifyUser)

module.exports = router;