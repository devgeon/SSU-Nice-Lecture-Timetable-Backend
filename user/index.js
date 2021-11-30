const { Router } = require('express');
const router = Router();
const ctrl = require('./user.ctrl');

// get
router.get('/department', ctrl.department)

module.exports = router;