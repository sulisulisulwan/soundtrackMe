const router = require('express').Router();
const { Errors } = require('../middleware')
const ctrl = require('../controllers')

router.get('/', Errors.handle, ctrl.errors.sendErrorToClient)


module.exports = router;