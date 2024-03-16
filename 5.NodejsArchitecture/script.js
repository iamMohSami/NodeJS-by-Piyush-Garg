const fs = require('fs') ; 

// Blocking Operation => SYNCHRONOUS

console.log("1") ; 
console.log("2") ; 

const res = fs.readFileSync("./BarcaLegends.txt" , "utf8") ; 
console.log(res) ;

console.log("3") ; 
console.log("4") ; 

/* OUTPUT :

1
2
Lionel Messi (GOAT)
Andreas Iniesta
Xavi
Carlos Puyol
Neymar Jr
Luis Suarez
3
4 

IN ORDER , PRINTING OF 3 AND 4 HAD TO WAIT LITTLE FOR READING FILE TO COMPLETE ITS TASK
i.e. BLocking fn blocks the execution of further code until it gets completed first */ 


// Non-Blocking Operation => ASYNCHRONOUS

console.log("1") ; 
console.log("2") ; 

fs.readFile("./BarcaLegends.txt" , "utf8" , (err,res)=>{
    if(err) { console.log("Error =" , err)}
    else { console.log(res)}
}) ; 

console.log("3") ; 
console.log("4") ; 

/* OUTPUT :

1
2
3
4
Lionel Messi (GOAT) 
Andreas Iniesta
Xavi
Carlos Puyol
Neymar Jr
Luis Suarez

NOT IN ORDER , PRINTING OF 3 AND 4 done before READING FILE TO COMPLETE ITS TASK */ 

/*Wkt, default thread size = 4 !
Can we increase it and what is MAX?? 
Hell Yeah, we can increase it, max thread size => DEPENDS ON THE NUMBER OF CORES IN YOUR SYSTEM
NUMBER OF CORES = MAX.NUMBER OF THREADS 
*/


// HOW TO FIND OUT YOUR NUMBER OF CORES?
// using "os" buil-in library

const myos = require('os') ;
console.log(myos.cpus().length) ;  
// my OUTPUT => 4

// ALWAYS WRITE NON-BLOCKING / ASYNCRONOUS CODE :))) 