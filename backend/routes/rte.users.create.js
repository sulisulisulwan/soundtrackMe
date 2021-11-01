const router = require('./rte.users.index.js')
const ctrl = require('../controllers')
const { Auth, SendEmail } = require('../middleware')

router.post('/create/', Auth.checkUserExists, Auth.updateResetPasswordToken, Auth.encryptAndStorePassword, ctrl.users_create.createUser)
router.get('/create/', SendEmail.confirmUserCreated, ctrl.users_create.sendRequestConfirmationEmail)
router.get('/create/confirmed/:username', ctrl.users_create.updateUserConfirmationStatus)
router.get('/create/confirmed/:username/notify', SendEmail.notifyUserCreated, ctrl.users_create.sendUserCreatedNotificationEmail)

module.exports = router;