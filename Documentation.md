# Requirements:

Postman and NodeJS

# Steps to Execute

Step 1:
npm i

Step2:
npm start

# ADD points:

POST http://localhost:8080/add

Add following sample inputs sequentially Using POSTMAN (in Raw, jason format)

● { "payer": "DANNON", "points": 1000, "timestamp": "2020-11-02T14:00:00Z" }
● { "payer": "UNILEVER", "points": 200, "timestamp": "2020-10-31T11:00:00Z" }
● { "payer": "DANNON", "points": -200, "timestamp": "2020-10-31T15:00:00Z" }
● { "payer": "MILLER COORS", "points": 10000, "timestamp": "2020-11-01T14:00:00Z" }
● { "payer": "DANNON", "points": 300, "timestamp": "2020-10-31T10:00:00Z" }

## Spend Points:

POST http://localhost:8080/spend

Then you call your spend points route with the following request Using POSTMAN(in Raw, jason format):

# { "points": 5000 }

expect the following response:
The expected response from the spend call would be:
[
{ "payer": "DANNON", "points": -100 },
{ "payer": "UNILEVER", "points": -200 },
{ "payer": "MILLER COORS", "points": -4,700 }
]

# Check The Balance:

GET http://localhost:8080/balance

expect the foolowing Balance response

{
"DANNON": 1000,
"UNILEVER": 0,
"MILLER COORS": 5300
}

Please Chech ScreenShot.pdf to check sample results.
