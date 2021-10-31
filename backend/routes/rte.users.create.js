const router = require('./rte.users.index.js')
const ctrl = require('../controllers/')

router.post('/create/', ctrl.users_create.createUser)
router.get('/create/', ctrl.users_create.getUserCreatedEmailConfirmation)
router.get('/create/confirmed/:username', ctrl.users_create.updateUserConfirmationStatus)

module.exports = router;