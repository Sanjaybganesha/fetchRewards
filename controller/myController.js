var express = require('express');
var app = express();
var router = express.Router();
var apiRoutes = require('../router/myrouter');
const fs = require('fs');

// controller functions
module.exports = {
    //implementation of promise to reader large data
    searchAlldata: function (req, res) {
        callMyPromise().then(function (result) {
            res.send(result);
        });
    }
};


//Step 1: declare promise
var myPromise = () => {
    return new Promise((resolve, reject) => {
        fs.readFile('data/data.json', (err, data) => {
            err
                ? reject(err)
                : resolve(data);
        });
    });
};

//Step 2: async promise handler
var callMyPromise = async () => {
    var result = await (myPromise());
    //anything here is executed after result is resolved
    return JSON.parse(result);
};