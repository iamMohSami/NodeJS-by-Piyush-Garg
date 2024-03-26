const mongoose = require('mongoose') ; 

// we will make a function here, with the url as a parameter from the main index.js file

async function connectMongoDB(url) {
    return mongoose.connect(url) ; 
}

module.exports = {
    connectMongoDB , 
}