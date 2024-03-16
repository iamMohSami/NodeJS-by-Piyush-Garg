/************** TASK => CREATE A HTTP SERVER ON PORT 6000 AND USING FILE SYSTEM , YOU NEED TO LOG THE TIME OF REQUEST IN A FILE NAMED log.txt */


const http = require('http') ;
const fs = require('fs') ; 

const myServer = http.createServer((req, res) => {
    const log = `Request received on ${new Date()} \n`;

    fs.appendFile("log.txt", log, (err) => {
        if (err) {
            console.error("Error occurred while logging request:", err);
        } else {
            console.log("Request received successfully on server.");
        }
    });
    res.end('Hello World! This is your HTTP server.');
});

/* WHY WE GET 2 REQUEST ALWAYS AT ONE TIME? 
ONE EXTRA REQUEST IS MADE BY THE BROWSER FOR THE "FAVICONJ" */ 

myServer.listen(8000 , () => {console.log("Server Started..")});

