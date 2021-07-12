var express = require('express');
var router = express.Router();
var fs = require('fs');

var myappcontroller = require('../controller/myController');

router.get('/search', myappcontroller.searchAlldata);


// router.get('/test', function (req, res) {
//     res.send('hello world')
// });

// router.get('/add', function (req, res) {
//     res.send('hello world')

// });

// Export API routes
module.exports = router;