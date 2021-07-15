const express = require('express');
const router = express.Router();

const myappcontroller = require('../controller/myController');

//URI
router.get('/balance', myappcontroller.balanceData);
router.post('/add', myappcontroller.addData);
router.post('/spend', myappcontroller.spendData);


// Export API routes
module.exports = router;