/*
TASK => Create a Express Server WITH USING MVC Architecture
*/

const express = require('express') ; 
const app = express() ; 
const PORT = 8002 ; 



// connection
const {connectMongoDB} = require('./connection') ; 
connectMongoDB("mongodb://127.0.0.1:27017/NodeJSTutorial").then(() => console.log("MONGODB is Connected!"));



//middlewares
const {logDetails} = require("./middlewares/index") ; 
app.use(express.urlencoded({ extended: false })); 
app.use(logDetails("log.txt")) ; 



//Routes
const UserRouter = require('./routes/user') ; 
app.use("/api/users" , UserRouter) ; 



app.listen(PORT , () => {console.log("Server is Started..")}) ; 

