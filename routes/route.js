const router = require('express').Router();
const processCrtl = require('../controller/Process');


router.post('/process', processCrtl.processEndPoint);
router.get('/process', processCrtl.getProcess);
router.get('/stats', processCrtl.statsEndPoint);
router.get('/stats/filter', processCrtl.fromDateFilter);

module.exports = router;