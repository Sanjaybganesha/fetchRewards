var express = require('express');
var app = express();
var router = express.Router();
var apiRoutes = require('../router/myrouter');
const fs = require('fs');
var balanceData=[];
var transactionData = [];

var spent={};
var totalBalance=0;

//[
//  { "payer": "DANNON", "points": -200, "timestamp": "2020-10-31T15:00:00Z" },
//  { "payer": "UNILEVER", "points": 200, "timestamp": "2020-10-31T11:00:00Z" },
//  { "payer": "DANNON", "points": 1000, "timestamp": "2020-11-02T14:00:00Z" },
//  { "payer": "MILLER COORS", "points": 10000, "timestamp": "2020-11-01T14:00:00Z" },
//  { "payer": "DANNON", "points": 300, "timestamp": "2020-10-31T10:00:00Z" }
//]
// controller functions
module.exports = {
    //using datafrom data.json remember to change it
    balanceData: function (req, res) {
        unquieTransactionData().then(function (result) {
            res.send(JSON.stringify((result)));
        });
    },
    addData: function (req, res) {
        let data = req.body;
        if (data.payer != null && data.payer != undefined && data.points != null && data.points != undefined && data.timestamp != null && data.timestamp != undefined) {
            addtranasctionData(data);
            addTotalBalance(data.points);
            res.send("Message received");
            console.log("transaction");
            console.log(transactionData);
        }
        else {
            res.send("Message failed");
        }
    
    },



    spendData: function (req, res) {
        spendValue = req.body.points;
        if (spendValue != null && spendValue != undefined) {
            let pointsToSpend = parseInt(req.body.points);// reading points taking it as int
            console.log(pointsToSpend);
            if (totalBalance < pointsToSpend) {
                res.send("points to spend is greater than total points available");
            }
            else {
                console.log("total Balance in spend Data " + totalBalance);
                subTotalBalance(pointsToSpend);

                res.send("points to spend");
    
            }
        }
    },
};

//Step 1: declare promise
var myPromise = () => {
    return new Promise((resolve, reject) => {
        fs.readFile('data/data.json', (err, data) => {
            if(err){
            reject("error");
            }else{
            resolve(data);
            }
        });
    });
};

//Step 2: async promise handler
var callMyPromise = async () => {
    var result = await (myPromise());
    //anything here is executed after result is resolved
    return JSON.parse(result);
};

var callunquieTransactionData = async () => {
    var result = await (unquieTransactionData());
    //anything here is executed after result is resolved
    return result;
};

//Step 1: declare promise
var unquieTransactionData = () => {
    return new Promise((resolve, reject) => {
        let dataCount = {};
        //saving in unique payers in dataCount obj
        transactionData.forEach((element) => {
            if (!dataCount[element.payer]) {
                dataCount[element.payer] = 0;
            }
            dataCount[element.payer] += element.points;
        });
        resolve(dataCount); 
    });
};


var addtranasctionData= function (data) {
    transactionData.push(data);
};

var addTotalBalance= function (data) {
    totalBalance += data.points;
};
var subTotalBalance= function (data) {
    totalBalance -= data.points;
};

