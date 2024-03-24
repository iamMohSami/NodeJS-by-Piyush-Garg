
const express = require('express') ; 
const users = require("./Users.json") ; 
const fs = require('fs') ; 

const app = express() ; 
const PORT = 8001 ; 

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


app.get("/users" , (req,res) => {
    const html = `
    <ul>
    ${users.map(user => `<li>${user.first_name}</li>`).join("")} ; 
    </ul>
    `
    res.send(html) ; 
})

app.get("/api/users" , (req,res) => {
    // to set custom header in RESPONSE
    res.setHeader("X-MyName" , "Mohammad Sami") ; 
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

