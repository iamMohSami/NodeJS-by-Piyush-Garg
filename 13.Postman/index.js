const express = require('express') ; 
const users = require("./Users.json") ; 
const fs = require('fs') ; 

const app = express() ; 
const PORT = 8000 ; 

//EXPRESS MIDDLEWARE
app.use(express.urlencoded({ extended: false })); 

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


// TO IMPLEMENT5 POST REQUEST USING POSTMAN
/*
for url : POST -> http://localhost:8000/api/users/
in body : select x-www-form-urlencoded } Basically like a form which is avlble at frontend to get data in key value pairs
Now : for parameters : id => will assign with code
                       make 5 new columns in the form with keys : first_name , last_name , email , gender , job_title
and give some new user data values to these keys in order to append this user to the users.json file

const body = req.body ; STORES ALL THE FORM DATA ENTERED IN NEW VARIABLE body
BUT BUT, if you print this body , it will show undefined , bcoz EXPRESS doesnt know which type of data / format of data this is in, SO WE NEED TO USE A MIDDLEWARE {plugIn} in order to access this data 
MIDDLEWARE USED HERE => app.use(express.urlencoded({extended : false})) // WILL LEARN IN DETAIL IN NEXT CLASS
After using this, if we console.log(body) , we will get the data of the new user ..!!!
*/



/*
now need to add this new data to users.json file , HOW TO? by using fs module
const fs = require('fs') ; 

 users.push({...body , id:users.length+1}) ; 
    fs.writeFile("./Users.json", JSON.stringify(users) , (err,data) => {
        return res.json({"status" : "pending"}) ;
    })

Request Handling: When a POST request is received at /api/users, the provided callback function is executed. Inside this function:

req.body: Extracts the body of the incoming POST request. This assumes that the body parser middleware has been applied earlier in the Express middleware stack to parse JSON or URL-encoded request bodies.
console.log(body): Logs the extracted request body to the console for debugging purposes.
Adding a New User:

{ ...body, id: users.length + 1 }: Creates a new user object by spreading the properties of the request body (body) and adding a new id property with a value that is one greater than the current length of the users array. This effectively auto-increments the ID for each new user.
users.push(...): Adds the newly created user object to the users array.
Writing to File:

fs.writeFile("./Users.json", JSON.stringify(users), ...): Writes the updated users array to the Users.json file. It serializes the users array into a JSON string using JSON.stringify().
The callback function handles the result of the file write operation. If an error occurs (err is not null), it sends a 500 (Internal Server Error) response. Otherwise, it sends a success response.

WITH THIS CODE, WE CAN SUCCESFULLY HANDLE OUR POST REQUESTS
*/




app.listen(PORT , () => {console.log("Server is Started..")}) ; 

