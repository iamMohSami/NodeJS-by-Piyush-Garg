const express = require('express') ; 

// CHANGE "APP" => "ROUTER"
const Router = express.Router()  ;

// We also remove "users" from every route address, will explicilitly mention it in the main "index.js" file

/*
Thus in main INDEX.JS we need to do things : 
1. const UserRouter = require("./routes/user") ; 
2. app.use("/users" , UserRouter) ; 
*/


// GET in html format 
/*
Router.get("/" , async (req,res) => {
    const allDBUsers = await User.find({}) ; //this fetches all the users list
    const html = `
    <ul>
    ${allDBUsers.map(user => `<li>${user.firstName} - ${user.email}</li>`).join("")} 
    </ul>
    `
    res.send(html) ; 
}) */ 

const {handleGetHTML,handleGetAllUsers , handleGetUserById , handlePatchUserById , handleDeleteById , handlePost} = require("../controllers/user")

// GET ALL in HTML format
// Router.get("/" , )
// GET ALL in API JSON format
Router.get("/" , handleGetAllUsers ) ; 
// GET WITH SPECIFIC ID in JSON format
Router.route("/:id" , handleGetUserById);
// PATCH 
Router.route("/:id" , handlePatchUserById) ; 
// DELETE
Router.route(":/id" , handleDeleteById) ; 
// POST i.e. Create new user
Router.route("/" , handlePost ) ; 



// DONT FORGET TO EXPORT AND IMPORT 
module.exports = Router ; 