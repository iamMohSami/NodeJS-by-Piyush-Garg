/*

In Production world , we use "Modular Programming" which means breaking our entire codebase in small and different modules/packages based on thier particular functions

*/

/* 
Example : 
let this "script.js" be our main production file , we will create another file called "math.js" hwich will contain four functions of +,-,* and / 
Now, you need to Export these functions from "math.js" to main file "script.js"  */

/*HOW TO? 

use "require" keyword of nodejs in the main file to IMPORT th module to main file
use "module.exports = functions" in script/subsidiary file to EXPORT these functions to the main file

*/


const math = require('./math') ; 

/*Why used "./math" , coz using requirewe can also import many built in JS functions like filehandling, buffer etc.... 
In order to import our made files/modules we give its poath in the dircetory using "./"  */

// console.log(math.add(2+5)) ; 

/*Still it will show error : TypeError: math.add is not a function
Because, we just IMPORTED our function to our main file but we also need to EXPORT this function from our math.js file */

// console.log(math(48,63)) ;   OUTPUT => 111
//After EXPORTING using module.exports = add ; we finally can use our ADD function in th main file

//AFTER EXPORTING ALL FUNCTIONS using module.exports = {add,sub,mult,div} 
console.log(math) ;

/* output : 
PS D:\Btech IIIT Surat 2022-2026\Web Dev\15) NodeJS by Piyush Garg\3.Modules> node script
{
  addFn: [Function: add],
  subFn: [Function: sub],
  multFn: [Function: mult],
  divFn: [Function: div]
}
*/

//utilising thwese functions
console.log(math.addFn(48,63))  ;
console.log(math.subFn(48,63))  ;
console.log(math.multFn(48,63))  ;
console.log(math.divFn(48,63))  ;