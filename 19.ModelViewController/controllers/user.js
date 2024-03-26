const User = require('../models/user') ; 

/*
async function handleGetHTML (req,res) {

}
*/

async function handleGetAllUsers(req,res) {
    const allDBUsers = await User.find({}) ; 
    return res.json(allDBUsers) ;
}

async function handleGetUserById(req,res) {
        const user = await User.findById(req.params.id) ; 
        if(!user) res.status(404).json({"Error Message" : "User Not Found :/"}) ;
        return res.json(user) ; 
}

async function handlePatchUserById(req,res) {
    const body = req.body;
        const userIndex = await User.findByIdAndUpdate(req.params.id , body) ; 
        if (userIndex === -1) {
            return res.status(404).json({ error: "User not found" });
        }
        return res.json({status : "Successfully Edited"}) ;
}

async function handleDeleteById(req,res) {
    const userIndex = await User.findByIdAndDelete(req.params.id) ; 
    if (userIndex === -1) {
        return res.status(404).json({ error: "User not found" });
    }
        return res.json({ status: "Success", message: "User deleted" });
}

async function handlePost(req,res) {
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
    return res.status(201).json({Msg : "Successfully Added New User" , id : Result._id});
}

module.exports = {
    // handleGetHTML ,
    handleGetAllUsers , 
    handleGetUserById ,
    handlePatchUserById ,
    handleDeleteById , 
    handlePost 
}