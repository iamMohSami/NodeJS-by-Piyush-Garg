const express = require('express') ; 
const users = require("./Users.json") ; 
const fs = require('fs') ; 

const app = express() ; 
const PORT = 8000 ; 

//EXPRESS MIDDLEWARE {Built-in middleware}
app.use(express.urlencoded({ extended: false })); 

app.use((res,req,next) => {
    console.log("Hello from Middleware-1") ; 
    req.username = "lucifer2004" ; 
    next() ; //if you dont call the next middleware, the code will get sttuck at this level infinetely
}) ;


// the change in request made by one middleware persists overall in the  other middlewares and also the main route code also.

app.use((res,req,next) => {
    console.log(`Hey there ${req.username}..!! This is Middleware 2 `) ; 
    next() ;
}) ;


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


app.route("/api/users/:id").get((req,res) => {
    const id = Number(req.params.id) ; 
    const user = users.find((user) => user.id === id) ; 
    return res.json(user) ; });

app.route("/api/users/:id")
    .patch((req, res) => {
        const id = Number(req.params.id);
        const body = req.body;
        const userIndex = users.findIndex((user) => user.id === id);
        if (userIndex === -1) {
            return res.status(404).json({ error: "User not found" });
        }
        users[userIndex] = { ...users[userIndex], ...body };
        fs.writeFile("./Users.json", JSON.stringify(users), (err) => {
            if (err) {
                return res.status(500).json({ error: "Failed to write to file" });
            }
            return res.json({ status: "Success", user: users[userIndex] });
        });
    })
    .delete((req, res) => {
        const id = Number(req.params.id);
        const userIndex = users.findIndex((user) => user.id === id);
        if (userIndex === -1) {
            return res.status(404).json({ error: "User not found" });
        }
        users.splice(userIndex, 1);
        fs.writeFile("./Users.json", JSON.stringify(users), (err) => {
            if (err) {
                return res.status(500).json({ error: "Failed to write to file" });
            }
            return res.json({ status: "Success", message: "User deleted" });
        });
    });


app.post("/api/users", (req, res) => {
    const body = req.body;
    console.log(body);
    users.push({ ...body, id: users.length + 1 });
    fs.writeFile("./Users.json", JSON.stringify(users), (err, data) => {
        if (err) {
            return res.status(500).json({ error: "Failed to write to file" });
        }
        return res.json({ status: "Success" , id: users.length});
    });
});

app.listen(PORT , () => {console.log("Server is Started..")}) ; 

