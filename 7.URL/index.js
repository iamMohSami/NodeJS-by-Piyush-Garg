/*

URL => Uniform Resource Locator

Components of URL => 
LET, For ex , "https://www.iammohsami.dev/"
HERE : 
https://  => PROTOCOL
www.iammohsami.dev => DOMAIN i.e. USER-FRIENDLY NAME OF MY IP ADDRESS of my server
/  => PATH (only one / = HomePage or RootPath ; can be /about ...)
*/

/*
PATH Examples : 
"https://www.iammohsami.dev/"
"https://www.iammohsami.dev/about"
"https://www.iammohsami.dev/contact-us"
"https://www.iammohsami.dev/projects/tic-tac-toe"   THIS IS AN NESTED PATH
*/



/*
URL QUERY PARAMETER : extra infoemation with the url
eg : 
https://www.iammohsami.dev/about?userid=2&a=2

Anything after the "?" are key value pairs send to server
*/

/*Consider our serever */
const http = require('http') ; 
const fs = require('fs') ; 
const url = require('url') ; 

const myServer = http.createServer((req,res)=>{
    if(req.url === "/favicon.ico") return res.end() ; 
    console.log("Request Recieved on Server") ; 
    const myUrl = url.parse(req.url , true) ;   //after installing URL package //True added later
    console.log(myUrl) ;  // prints all the details of the request made
    const log = `This Server was recieved on ${new Date()} on path ${req.url}\n` ; 

    fs.appendFile("log2.txt" , log , (err,data) => {
        if (err) {
            console.error("Error occurred while logging request:", err);
        } else {
            switch(myUrl.pathname){ //changed from req.url to myUrl.pathname
                case '/' : res.end("Heyyy..You are on HomePage") ; break ; 
                case '/about' : res.end("I am Ironman and sometimes Batman too :)") ; break ; 
                // case '/contact' : res.end("Please do not try to contact me...") ; break ; 
                case '/contact' :
                    const userName = myUrl.query.myname ; 
                    const id = myUrl.query.id ; 
                    const age = myUrl.query.age ; 
                    res.end(`Your Details : \n Name = ${userName} \n Id = ${id} \n Age = ${age}`) ; break ; 
                default : res.end("404 PAGE NOT FOUND") ; 
            }
        }
    }) ; 
})

myServer.listen(8002  , ()=> { console.log("Server Started")}) ;




// ----------- #####   INSTALLING URL MODULE AND ITS FEATURES ####### -----------------------


/*Here, when we go on https://localhost:8002/ OR https://localhost:8002/home
we get : Heyyy..You are on HomePage

On https://localhost:8002/about 
we get : I am Ironman and sometimes Batman too :) 

On https://localhost:8002/contact 
we get : Please do not try to contact me...   */ 

/* BUT IF WE TRY TO add query parameters in the url : 
On https://localhost:8002/contact?myname=sami&id=48
we get : 404 PAGE NOT FOUND 
But, in log file : This Server was recieved on Tue Mar 19 2024 21:25:45 GMT+0530 (India Standard Time) on path /contact?myname=sami&id=48  */ 

/*
here, THE QUERY PARAMETERS ARE ALSO CONSIDERED AS MAIN  PATH ONLY 
now, we need to SEPARATE THESE PARAMETERS FROM THE ORIGINAL URL AND ALSO THE WEBPAGE SHOULD STILL GIVE OUTPUT OF CONTACT PAGE i.e. " Please do not try to contact me... " INSTEAD of "404 PAGE NOT FOUND "  */ 


// HOW TO??? 
// we have a new package named "url"
// install in terminal by "npm i url" 
// it breaks the url and give all the data 

/* CHANGES TO NOTICE AFTER INSTALLING IT : 
WE HAVE A NEW DEPENDENCY IN THE PACKAGE.JSON FILE  :
 "dependencies": {
    "url": "^0.11.3"
  }
  */
// Also, a new folder is created named as "Node Modules" hich contains all the data of this package "url"




//---EVEN THOUGH WE HAVE QUERY PARAMETERS, IT SHOULD STICK TO ITS DEFAULT PATH AND NOT TO NEW WEBPAGE---
/*
WKT, 
On https://localhost:8002/contact?myname=sami&id=48
we get : 404 PAGE NOT FOUND 
But, in log file : This Server was recieved on Tue Mar 19 2024 21:25:45 GMT+0530 (India Standard Time) on path /contact?myname=sami&id=48 

WE DONT WANT 404 PAGE NOT FOUND 
on adding of query parametrs, it shouldnt change the webpage 
i.e.on path /contact?myname=sami&id=48
we should still get the output of our contact page only 

HOW TO? 
we change the switch case condition : 
FROM : switch(req.url){
TO : switch(myURL.pathname)
*/

// ----------- ##### OBTAINING QUERY PARAMETERS AS A OBJECT ####### -----------------------
/*
WE HAVE ,  const myUrl = url.parse(req.url) ; 
url.parse has a parameter named "parseQueryString" ; if we pass TRUE in our request, it will get enabled and will store our query parametrs in object file
THUS NOW WE USE : 
FROM => 
const myUrl = url.parse(req.url) ;    
FROM OUTPUT => 
 search: '?myname=sami&id=48',
  query: 'myname=sami&id=48',
  pathname: '/contact',

TO => 
 const myUrl = url.parse(req.url , true) ;    
TO OUTPUT => 
  search: '?myname=sami&id=48',
  query: [Object: null prototype] { myname: 'sami', id: '48' },
  pathname: '/contact',

  EXAMPLE2 } 
   search: '?myname=sami&id=48&age=20&color=yellow',
  query: [Object: null prototype] {
    myname: 'sami',
    id: '48',
    age: '20',
    color: 'yellow'
  },
  pathname: '/contact',
*/



// ----------- ##### PRINTING QUERY PARAMETERS(FROM OBJECT) ON WEBPAGE  ####### -----------------------
/*

FROM : 
  // case '/contact' : res.end("Please do not try to contact me...") ; break ; 

FROM OUTPUT :  
url = http://localhost:8002/contact?myname=sami&id=48&age=20
webpage = Please do not try to contact me..

CHANGED TO : 
 case '/contact' :
                    const userName = myUrl.query.myname ; 
                    const id = myUrl.query.id ; 
                    const age = myUrl.query.age ; 
                    res.end(`Your Details : \n Name = ${userName} \n Id = ${id} \n Age = ${age}`) ; break ; 
webpage = 
Your Details : 
 Name = sami 
 Id = 48 
 Age = 20


*/