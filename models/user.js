// so we are actually getting the mongoose instance that would be helping us to 
// create an schema => Structure of our data
const mongoose = require('mongoose');
const userschema = new mongoose.Schema({
    firstname:{
        type:String,
        required: true,
    },
    lastname:{ 
        type:String
    },
    gender:{
        type:String
    }
})

// Once the schema is created we need to have the model with which we would perform
// the crud operations.
const usermodel = mongoose.model("user",userschema);
// Now exporting the model so that it can be used in other files
module.exports = usermodel;
