// Create a server which has 2 webpages HOMEPAGE and SIGNUP and it should create a log.txt which should have time + HTTP Method 
// homeopage => Get
// Signup => Get and Post using IF-ELSE IF 

const http = require("http") ; 
const fs = require("fs") ; 
const url = require("url") ; 


const myServer = http.createServer((req,res) => {
    if(req.url === "/favicon.ico") return res.end() ; 
    console.log("Request Recieved on Server") ; 
    const myUrl = url.parse(req.url) ; 
    const log = `This Server was recieved on ${new Date()} and METHOD = ${req.method}\n` ; 

    fs.appendFile("log.txt" , log , (err,data) => {
        if (err) {
            console.error("Error occurred while logging request:", err);
        } else {
            switch(myUrl.pathname){ 
                case '/' : 
                if(req.method==="GET") res.end("HomePage") ; break ; 
                
                case '/signup' :
                   if(req.method==="GET") res.end("This is a SignUp form") ; 
                   else if(req.method==="POST") res.emd("SignUP Success") ;
                   break; 

                default : res.end("404 PAGE NOT FOUND") ; 
            }
        }
    }) ; 
})

myServer.listen(8004  , ()=> { console.log("Server Started")}) ;




