console.log('Hello JS , i am back..!!') ; 

/*
In browser's console , if we write
console.log(window) -> we get window object 
alert("Warning")   -> we get alert

BUT, IF WE TRY THIS ON OUR VS CODE NODEJS Terminal
we get error
ReferenceError: window is not defined 

WHY? 
Coz V8 Engine(without DOM | only core functions) && C++  -> nodejs

*/

// console.log(window) ; 
// alert('Heyyyy..Buddy Ji.!!  How are you??') ;


/*
Whenever we start a new project, we first write "npm init" in the terminal

This creates a new file "package.json" which is kinda a configuration file of our project
Here, in "scripts" , make a new entry =>  "start" : "file name"

{
  "name": "nodejs",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
    "start" : "node hello.js"
  },
  "author": "",
  "license": "ISC"
}

Now, in terminal you just need to write "npm start"
it will run the hello.js file

*/