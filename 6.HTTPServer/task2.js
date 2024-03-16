/************** TASK => CREATE A HTTP SERVER ON PORT 8005 AND USING FILE SYSTEM , YOU NEED TO LOG THE TIME OF REQUEST IN A FILE NAMED log2.txt along with the path name and also create a switch case for url returning various values to the browser */

const http = require('http') ; 
const fs = require('fs') ; 

const myServer = http.createServer((req,res)=>{
    console.log("Request Recieved on Server") ; 

    const log = `This Server was recieved on ${new Date()} on path ${req.url}\n` ; 

    fs.appendFile("log2.txt" , log , (err,data) => {
        if (err) {
            console.error("Error occurred while logging request:", err);
        } else {
            switch(req.url){
                case '/' : res.end("Heyyy..You are on HomePage") ; break ; 
                case '/about' : res.end("I am Ironman and sometimes Batman too :)") ; break ; 
                case '/contact' : res.end("Please do not try to contact me...") ; break ; 
                default : res.end("404 PAGE NOT FOUND") ; 
            }
        }
    }) ; 
})

myServer.listen(8005  , ()=> { console.log("Task2 Server Started")}) ;