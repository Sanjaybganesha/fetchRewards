var express = require('express');
var router = express.Router();
var fs = require('fs');

var myappcontroller = require('../controller/myController');

router.get('/balance', myappcontroller.balanceData);
router.post('/add', myappcontroller.addData);
router.post('/spend', myappcontroller.spendData);


// Export API routes
module.exports = router;