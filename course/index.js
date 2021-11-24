const { Router } = require('express');
const router = Router();
const ctrl = require('./course.ctrl');

// get
router.get('/', ctrl.data)

module.exports = router;