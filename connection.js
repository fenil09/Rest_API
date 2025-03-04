const mongoose = require('mongoose');


// Just created a function that would establish the connection with mongoDb.
function connectmongodb(){
    return   mongoose.connect('mongodb://127.0.0.1:27017/backend')
}
// Exporting the function so that it can be used in index.js file which is the entry point
// for our app.
module.exports = connectmongodb; 

