const router = require('./rte.users.created.js')
const ctrl = require('../controllers/')
const { Auth } = require('../middleware/index.js');


router.post('/reset-password', ctrl.users_reset_password.requestPasswordChange)
router.get('/reset-password/reset/:username', ctrl.users_reset_password.sendPasswordChangePage)
router.post('/reset-password/reset',  Auth.encryptPassword, ctrl.users_reset_password.changePassword)

module.exports = router;