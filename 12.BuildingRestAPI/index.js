const express = require('express') ; 
const users = require("./Users.json") ; 

const app = express() ; 
const PORT = 8000 ; 

app.get("/users" , (req,res) => {
    const html = `
    <ul>
    ${users.map(user => `<li>${user.first_name}</li>`).join("")} ; 
    </ul>
    `
    res.send(html) ; 
})

app.get("/api/users" , (req,res) => {
    return res.json(users) ; 
});

//dynamic path : ./api/users/:id
// colon id i.e. :id => means dynamic variable 

app.get("/api/users/:id" , (req,res) => {
    // need to parse particular id based on the url entered
    // need to convert string into number
    const id = Number(req.params.id) ; 
    // need to find the user from json database who has this id 
    const user = users.find((user) => user.id === id) ; 
    return res.json(user) ; 
})


// BASICALLY, BROWSERS DO ONLY GET REQUEST , SO THE FURTHER ROUTES WILL BE DONE LATER IN THE COURSE , FOR NOW WE WILL JUST PASSA JSON WITH STATUS PENDING

app.post("/api/users" , (req,res) => {
    //TODO in upcoming lectures
    return res.json({"status" : "pending"}) ; 
})

app.patch("/api/users/:id" , (req,res) => {
    //TODO in upcoming lectures
    return res.json({"status" : "pending"}) ; 
})

app.delete("/api/users/:id" , (req,res) => {
    //TODO in upcoming lectures
    return res.json({"status" : "pending"}) ; 
})

app.listen(PORT , () => {console.log("Server is Started..")}) ; 


/* 
Here, the GET WITH ID , PATCH AND DELETE HAVE SAME ROUTE :  "/api/users/:id" 
so, we can merge them together for smaller code 




app.route("/api/users/:id").get((req,res) => {
    const id = Number(req.params.id) ; 
    const user = users.find((user) => user.id === id) ; 
    return res.json(user) ; }).patch((req,res) => {
        return res.json({"status" : "pending"}) ; 
    }).delete((req,res) => {
        return res.json({"status" : "pending"}) ; 
    }); 


THIS IS RECOMMENDED...!!!1
*/