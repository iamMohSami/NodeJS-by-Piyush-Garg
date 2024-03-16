// BUILD A HTTP SERVER

//will use a inbuilt module named "http" 
const http = require('http') ; 

// to create a server, use http.createserver() which also contains a callback function
// this callback functionn has 2 parameters , req and res 
// req brings all the metadata/details of the INCOMING REQUEST made by the user
const myServer = http.createServer( (req,res) => {
    console.log("New Request Recieved...") ; 
    //to end the request and give back result to the user , we use res.end() 
    console.log(res) ; 
    res.end("Hello from the Server..!!  :)") ; 
} ) ;

// we need a port number to run our server ; done using myServer.listen(portnumber , optional callback fn to console something to show that everything is running fine and no error)
// a port is basically like a door where our server can run
// one port can have only one server running on it 
myServer.listen(8001 , () =>{console.log("Heyy.. Server Started")}) ; 

// Now go on Browser, and type "localhost:8000" , our server is running and it prints : "Hello from the Server..!!  :)" on the webpage 







