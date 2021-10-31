const router = require('./rte.users.index.js')
const ctrl = require('../controllers/')
const { Auth, SendEmail } = require('../middleware/index.js')

router.post('/create/', Auth.checkUserExists, Auth.updateResetPasswordToken, Auth.encryptAndStorePassword, ctrl.users_create.createUser)
router.get('/create/', SendEmail.confirmUserCreated, ctrl.users_create.sendRequestConfirmationEmail)
router.put('/create/confirmed/:username', ctrl.users_create.updateUserConfirmationStatus)
router.get('/create/confirmed/:username', SendEmail.notifyUserCreated, ctrl.users_create.sendUserCreatedNotificationEmail)

module.exports = router;