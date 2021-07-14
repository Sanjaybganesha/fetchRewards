var express = require('express');
var app = express();
var router = express.Router();
var apiRoutes = require('../router/myrouter');
const fs = require('fs');
var balanceData=[];
var transactionData = [];
var unquiePayer = [];
// controller functions
module.exports = {
    //implementation of promise to reader large data
    balanceData: function (req, res) {
        
        callMyPromise().then(function (result) {
            console.log(result);
            transactionData = result;
            console.log(transactionData);
            unquiePayer=transactionData.map(item => item.payer).filter((value, index, self) => self.indexOf(value) === index);
            console.log(unquiePayer);  
            res.send(JSON.stringify(unquiePayer));
    
    });
        //console.log(uniquePayer);
    
    },
    addData:function(req,res){
    console.log("Got Body:",req.body);
    data=req.body;
    if(data.payer!=null && data.payer!=undefined){
    if(data.points!=null && data.points!=undefined){

    if(data.timestamp!=null && data.timestamp!=undefined){
        transactionData.push(data);
        console.log(transactionData);
        res.send("Message received");
    }
    else{
        res.send("Message failed");

        }
    }
    else{
    transactionData.push(req.body);
    res.send("Message failed");
    }
    }
    else{
        res.send("Message failed");
        }
    },
    spendData:function (req, res) {
        console.log("Got Body:",req.body);
        data=req.body;
        res.send("hi i am spend");
    }
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