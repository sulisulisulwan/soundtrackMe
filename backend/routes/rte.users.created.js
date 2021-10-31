const router = require('./rte.users.index.js')
const ctrl = require('../controllers/')


router.get('/created/', ctrl.users_created.getUserCreatedEmailConfirmation)
router.get('/created/confirmed/:username', ctrl.users_created.updateUserConfirmationStatus)

module.exports = router;