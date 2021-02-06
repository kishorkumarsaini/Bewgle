const router = require('express').Router();
const processCrtl = require('../controller/Process');


router.post('/process', processCrtl.processEndPoint);
router.get('/process', processCrtl.getProcess);

module.exports = router;