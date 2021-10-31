const router = require('./rte.users.reset_password.js')
const ctrl = require('../controllers/')
const { Users } = require('../models/index.js');
const { Auth } = require('../middleware/index.js')

router.post('/verify', ctrl.users_verify.verifyUser)

module.exports = router;