const router = require('./rte.users.create.js')
const ctrl = require('../controllers')
const { Auth, SendEmail } = require('../middleware');


router.post('/reset-password', Auth.compareUsernameAndEmail, Auth.updateResetPasswordToken, SendEmail.resetPassword, ctrl.users_reset_password.requestPasswordChange)
router.get('/reset-password/reset/:username', Auth.compareResetTokens, Auth.updateResetPasswordToken, ctrl.users_reset_password.sendPasswordChangePage)
router.post('/reset-password/reset',  Auth.encryptAndStorePassword, ctrl.users_reset_password.changePassword)

module.exports = router;