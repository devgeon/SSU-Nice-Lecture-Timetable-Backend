const { Router } = require('express');
const router = Router();
const ctrl = require('./subject.ctrl');

// get
router.get('/timetable', ctrl.page)
router.post('/timetable', ctrl.data);

module.exports = router;