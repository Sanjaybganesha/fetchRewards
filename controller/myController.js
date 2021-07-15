const express = require('express');
const app = express();
const router = express.Router();
const apiRoutes = require('../router/myrouter');
var transactionData = [];
var totalBalance=0;

module.exports = {
/** To track all the transaction*/ 
    balanceData: function (req, res) {
        unquieTransactionData().then(function (result) {
            res.send(JSON.stringify((result)));
        });
    },

/**add given transactions to transactionData and calculate total Balance*/
    addData: function (req, res) {
        let data = req.body;
        if (data.payer != null && data.payer != undefined && data.points != null && data.points != undefined && data.timestamp != null && data.timestamp != undefined) {
            let date = new Date(data.timestamp);
            data.timestamp = date;
            addtranasctionData(data);
            addTotalBalance(data.points);
            res.json({
                status: '200',
                message: 'Message received',
             });
          //  res.send("Message received");
        }
        else {
            res.json({
                status: '200',
                message: 'Message header format error',
             });
    
            //res.send("Message failed");
        }
    
    },
/**dedut pointsToSpend from the transactions in order of oldest points spent first */
    spendData: function (req, res) {
        spendValue = req.body.points;
        if (spendValue != null && spendValue != undefined) {
            let pointsToSpend = parseInt(req.body.points);/** reading points taking it as int*/
            
            if (totalBalance < pointsToSpend) {
                res.send("points to spend is greater than total points available");
            }
            else {
                console.log("total Balance in spend Data " + totalBalance);
                /** sorting the transactionData */
                sortTransactionData();
               
                console.log(transactionData);
                let result = subTotal(pointsToSpend);
                //spend points
                subTotalBalance(pointsToSpend);
                res.send(result);
            }
        }
    },
};


var callunquieTransactionData = async () => {
    let result = await (unquieTransactionData());
    /**anything here is executed after result is resolved*/
    return result;
};

/**Identifying Unique Payers from given transactions*/
var unquieTransactionData = () => {
    return new Promise((resolve, reject) => {
        let dataCount = {};
        /**saving in unique payers in dataCount obj*/
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

/**To sort transactionData*/
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
/**dedut pointsToSpend from the transactions in order of oldest points spent first
and Update the in the transactionData*/
var subTotal = function (pointsToSpend){
    //dictionary to maintainn unique transactions    
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
                        result[element.payer] -= element.points;
                        pointsToSpend = pointsToSpend - element.points;
                        element.points = 0;
                    }
                    else {
                        result[element.payer] = -(element.points);
                        pointsToSpend = pointsToSpend - element.points;
                        element.points = 0;
                        
                    }
                }

                }
            
        });
        console.log(result);
        return result;
    }

/**
 * push given add transaction call to transactionData
 * */
var addtranasctionData= function (data) {
    transactionData.push(data);
};
/**to maintain total balance*/
var addTotalBalance= function (data) {
    totalBalance += data.points;
};
var subTotalBalance= function (data) {
    totalBalance -= data.points;
};

