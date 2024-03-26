const fs = require("fs");

function logDetails(filename) {
  return (req, res, next) => {
    console.log(`Good to see you ${req.firstname} ${req.lastname} sir`);
    fs.appendFile(
      filename ,
      `\n Request made on : ${new Date()} || Method : ${req.method} || IP : ${
        req.ip
      } || PATH : ${req.path}`,
      (err, data) => {
        if (err) console.log("Error Occured");
        next();
      }
    );
  };
}


module.exports = {
    logDetails ,
};