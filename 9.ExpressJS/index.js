/*
const http = require('http') ; 

const express = require('express') ; 

const app = express() ; //this is basically ouyr handler function 

app.get('/' , (req,res) => {
    return res.send("Hello From homepage") ; 
})

app.get('/about' , (req,res) => {
    return res.send(`Hello from ABOUT\nYour Name = ${req.query.name}\nAge = ${req.query.age}`);
})

app.get('/contact' , (req,res) => {
    return res.send("Hello From CONTACT") ; 
})

const myServer = http.createServer(app) ; 
myServer.listen(8003 , () => {
    console.log("Server Started :)") ; 
})
*/

// --------- ADDING QUERY PARAMETERS ----------------
/*
for => 
http://localhost:8003/about
output => 
Hello From ABOUT

now, for => 
http://localhost:8003/about?name=sami&age=20
output => 
Hello From ABOUT
THUS, NO NEED TO BRING URL MODULE TO HANDLE QUERY PARAMETERS , EVRYTHING ID BUILT IN ..!!!!
*/


// --------- WE EVEN DONT NEED HTTP MODULE ALSO.....!!!!!----------------

const express = require('express') ; 

const app = express() ; //this is basically ouyr handler function 


//BASIC ROUTING SUNTAX => app.method(PATH,HANDLER)

app.get('/' , (req,res) => {
    return res.send("Hello From homepage") ; 
})

app.get('/about' , (req,res) => {
    return res.send(`Hello from ABOUT\nYour Name = ${req.query.name}\nAge = ${req.query.age}`);
})

app.get('/contact' , (req,res) => {
    return res.send("Hello From CONTACT") ; 
})

app.listen(8003 , () => {console.log("Server Started :)")}) ;


/*
DOES IT MEANS THAT , WE ARE NOT USING HTTP MODULE HERE? 
NO, we are , express internally acquires http modules and uses it 
its just we dont need to require it explicilitly
express does it for us but yes , it uses http module only in backend pov
*/