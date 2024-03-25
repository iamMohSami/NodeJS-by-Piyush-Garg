/*
TASK => Create a Express Server using MongoDB to perform CRUD operations instead of Users.json file
*/

const express = require('express') ; 
const mongoose = require('mongoose') ; 
const app = express() ; 
const PORT = 8002 ; 

// ONLY FOR MIDDLEWARE-3 PART || not used to store any user data || Used MONGODB instead
const fs = require('fs') ;

//MAKE CONNECTION
mongoose.connect("mongodb://127.0.0.1:27017/NodeJSTutorial").then(() => console.log("MongoDB is connected")).catch((err) => {console.log("Error in Connecting MONGODB : " , err)}) ; 

//SCHEMA
const userSchema = new mongoose.Schema({
    firstName : {
        type : String ,   //String with a capital "S" 
        required : true , 
    } , 
    lastName : {
        type : String ,
    } , 
    email : {
        type : String , 
        required : true , 
        unique : true ,
    }, 
    jobTitle : {
        type : String ,
    } , 
    gender : {
        type : String , 
    },
} , {timestamps : true}); 
//timestamps : true => this will automatically add CreatedAt and UpdatedAt using this timestamps:true
// Here,No need of ID also, MongoDB by default maintains the ID of each new user input


//MODEL
const User = mongoose.model("user" , userSchema) ; 

//1st MIDDLEWARE {Built-in middleware}
app.use(express.urlencoded({ extended: false })); 

// 2nd MIDDLEWARE
app.use((req,res,next) => {
    console.log("Heyy from Middleware-1") ; 
    req.firstname = "Lucifer" ; 
    req.lastname = "Oberoi" ; 
    next() ; //if you dont call the next middleware, the code will get sttuck at this level infinetely
}) ;

// 3rd MIDDLWARE
app.use((req,res,next) => {
    console.log(`Good to see you ${req.firstname} ${req.lastname} sir`) ; 
    fs.appendFile("log.txt" , `\n Request made on : ${new Date} || Method : ${req.method} || IP : ${req.ip} || PATH : ${req.path}` , 
    (err,data) => {
         if(err) console.log("Error Occured") ; 
         next() ; 
    }
);
})

// GET in html format
app.get("/users" , async (req,res) => {
    const allDBUsers = await User.find({}) ; //this fetches all the users list
    const html = `
    <ul>
    ${allDBUsers.map(user => `<li>${user.firstName} - ${user.email}</li>`).join("")} 
    </ul>
    `
    res.send(html) ; 
})

// GET ALL in API JSON format
app.get("/api/users" , async (req,res) => {
    // to set custom header in RESPONSE
    res.setHeader("X-MyName" , "Mohammad Sami") ;
    const allDBUsers = await User.find({}) ; //this fetches all the users list
    return res.json(allDBUsers) ; 
});

// GET WITH SPECIFIC ID in JSON format
app.route("/api/users/:id").get(async (req,res) => {
    res.setHeader("X-MyName" , "Mohammad Sami") ; 
    const user = await User.findById(req.params.id) ; 
    if(!user) res.status(404).json({"Error Message" : "User Not Found :/"}) ;
    return res.json(user) ; });

// PATCH and DELETE
app.route("/api/users/:id").patch(async (req, res) => {
        const body = req.body;
        const userIndex = await User.findByIdAndUpdate(req.params.id , body) ; 
        if (userIndex === -1) {
            return res.status(404).json({ error: "User not found" });
        }
        return res.json({status : "Successfully Edited"}) ; 
    })
    .delete(async (req, res) => {
        const userIndex = await User.findByIdAndDelete(req.params.id) ; 
        if (userIndex === -1) {
            return res.status(404).json({ error: "User not found" });
        }
            return res.json({ status: "Success", message: "User deleted" });
    });

// POST 
app.post("/api/users", async (req, res) => {
    const body = req.body;
    console.log(body);
    if(!body || !body.first_name || !body.last_name || !body.email || !body.gender || !body.job_title) {
        res.status(400).json({"Error Message" : "Please Fill all the Details Completely.."}) ;
    }
    const Result = await User.create({
        firstName : body.first_name ,
        lastName : body.last_name , 
        email : body.email ,
        gender : body.gender , 
        jobTitle : body.job_title ,
    }) ;
    console.log(`New User Added : \n ${Result}`) ; 
    return res.status(201).json({Msg : "Successfully Added New User"});
});

app.listen(PORT , () => {console.log("Server is Started..")}) ; 

