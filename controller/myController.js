var express = require('express');
var app = express();
var router = express.Router();
var apiRoutes = require('../router/myrouter');
const fs = require('fs');
var balanceData=[];
var transactionData = [];
var totalBalance=0;

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
            let date = new Date(data.timestamp);
            data.timestamp = date;
            addtranasctionData(data);
            addTotalBalance(data.points);
            res.send("Message received");
          //  console.log("transaction");
           // console.log(transactionData);
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

                sortTransactionData();
               
                console.log(transactionData);
                let result=subTotal(pointsToSpend);
                subTotalBalance(pointsToSpend);
                res.send(result);
            }
        }
    },
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

var callsortTransactionData = async () => {
    return await (sortTransactionData());
};

//Step 1: declare promise
var sortTransactionData = () => {
    return new Promise((resolve, reject) => {
        transactionData.sort((a, b) => {
            if (a.timestamp < b.timestamp) {
                return -1;
            } else {
                return 1;
            }
        });
        resolve(); 
    });
};

var subTotal = function (pointsToSpend){
    //saving in unique payers in dataCount obj
   // let indexPoints = [];
    let result = {};
    
        transactionData.forEach((element,index) => {
            if (pointsToSpend > 0) {
 
                if (element.points > pointsToSpend ) {
                   
                    if (!result[element.payer]) {
                        
                        result[element.payer] = 0;
                    }
                    
                    result[element.payer] = -(pointsToSpend);
                   
                    element.points = element.points - pointsToSpend;
                    pointsToSpend -= element.points;
                    
                }
               else {
                    if (!result[element.payer]) {
                        result[element.payer] = 0;
                    }
                    if (element.points < 0) {
                        result[element.payer] -=element.points;
                        pointsToSpend = pointsToSpend - element.points;
                        element.points = 0;
                    }
                    else {
                        result[element.payer] = -(element.points);
                        pointsToSpend = pointsToSpend - element.points;
                        element.points = 0;
                        //indexPoints.push(index);
                    }
                }

                }
            
        });
        console.log(result);
        return result;
    }


var addtranasctionData= function (data) {
    transactionData.push(data);
};

var addTotalBalance= function (data) {
    totalBalance += data.points;
};
var subTotalBalance= function (data) {
    totalBalance -= data.points;
};

