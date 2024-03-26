const mongoose = require('mongoose') ; 

//SCHEMA
const userSchema = new mongoose.Schema({
    firstName : {
        type : String ,   
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

//MODEL
const User = mongoose.model("user" , userSchema) ; 

//Dont forget to EXPORT 
module.exports = User ; 
