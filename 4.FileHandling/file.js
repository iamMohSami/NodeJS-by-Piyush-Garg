/* 
File Handling means we can do operations on files of our local computer
can create, delete , edit files using NODEJS
*/

// To start with file handling, we need a built in module named "fs" which stands for file system 

const fs = require('fs') ; 
// console.log(fs) ;


//********************************** CREATE A NEW FILE *********************************************

/* 2 WAYS : writeFile and writeFileSync  */


// writeFileSync => SYNCHRONOUS FUNCTION i.e. BLOCKING FUNCTION ||  CAN RETURN THE DATA
// using writefileSync , syntax => fs.writeFileSync('filename' , 'content')
fs.writeFileSync("./test.txt" , "Hey..This file is created using writeFileSync") ;


// writeFileSync => ASYNCHRONOUS FUNCTION i.e. NON-BLOCKING FUNCTION || NEVERS RETURNS DATA, NEEDS CALLBACK
// using writefile , syntax => fs.writeFile('filename' , 'content' , (err)=> {}) 
// extra 3rd parameter as a callback function for error handling
fs.writeFile("./test2.txt" , "Hey..This file is created using writeFile" , (err)=> {}) ;


/*************************************** READING AN EXISTING FILE ******************************  */
/* 2 WAYS : readFile and readFileSync  */

// using readFileSync ; syntax => fs.readFileSync("filename" , "encoding")
// readFileSync ALWAYS RETURNS THE DATA, can be stored in another variable

const data = fs.readFileSync("./contacts.txt" , "utf-8") ; 
console.log(data) ;


// using readFile ; syntax => fs.readFileSync("filename" , "encoding" , (err,result)=>{})
// readFile DOES NOT RETURNS THE DATA,we mandatorily need to give callback fn as 3rd parameter which has err and result in it

fs.readFile("./contacts.txt" , "utf-8" , (err,res)=>{
    if(err) {console.log("Error Occured :" , err)}
    else{
        console.log(res) ; 
    }
})


/*************************************** EDITING/APPENDING AN EXISTING FILE*************************  */
/* 2 WAYS AGAIN : appendFile and appendFileSync  */

// using appendFileSync
// syntax => fs.appendFileSync("filename" , "new appending content")
fs.appendFileSync("./contacts.txt" , "\nDhruv Rathee : +91727272727272") ; 


/*************************************** COPYING AN EXISTING FILE*************************  */
fs.copyFileSync("./contacts.txt" , "./Copied.txt") ; 


/*************************************** DELETING EXISTING FILE*************************  */
fs.writeFileSync("./delete.txt" , "Will delete this file using unlink ") ; 
fs.unlinkSync("./delete.txt") ; 

/*************************************** GETTING STATISTICS OF AN EXISTING FILE*******************  */
const stats = fs.statSync("./contacts.txt") ; 
console.log(stats) ;