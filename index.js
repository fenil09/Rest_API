const express = require('express');
const app= express();
const fs =require('fs');
const users= require("./MOCK_DATA.json");
const { error } = require('console');

// requiring the mongoose package helping us to connect to mongodb
const mongoose = require("mongoose");
const { type } = require('os');
const { json } = require('stream/consumers');



// setting up the connection with mongodb, just use the mongoose object and pass the url on which
// the mongodb is running.


mongoose.connect('mongodb://127.0.0.1:27017/backend').then(() => console.log("connection done"));

// creating a schema

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

// creating a model now helping to interact with mongodb
const usermodel = mongoose.model("user",userschema);






// middleware to parse the json data.
app.use(express.urlencoded({extended:false}));


// creating a middleware that would be helping us to create a log file showing some important details for the api call
 app.use(function(request,response,next){
    fs.appendFile("log.txt",`${Date.now()}`,function(error){
        if(error){
            response.send(error)
        }
        next();
    })
    
 })
// Getting all the users
app.get("/users",async function (request,response){
    response.setHeader("myheader","Fenil")
    // adding X before the header name can be seen as the best practice.
    const alldatabaseuser =  await usermodel.find({});
    response.json(alldatabaseuser);
    
})

// Getting a particular user.

app.get("/users/:id",async function(request,response){
    const id = request.params.id;
    // getting the ID so that we can match use it for performing the matching logic
    const founduser = await usermodel.findById(id);
    response.json(founduser);
})

// Creating a new user.

app.post("/users",function(request,response){
     const body = request.body;
     // Adding a check which would see if the user is sending all the fields with the request or not
     // if not we can handle it by using the 400 status code which stands for the bad request.
     if(!body.first_name || !body.last_name ||  !body.gender){
       return response.status(400).send("Please provide all the fields")
     }
      usermodel.create({
        firstname : body.first_name,
        lastname : body.last_name,
        gender: body.gender
      })
      response.status(201).send("User created");

    // changing the status code to 201, indicating creation of a successfull entity.
})
// Removing a user

 app.delete("/users/:id",async function(request,response){
    const id = request.params.id
       await usermodel.findByIdAndDelete(id);
       response.json({status : "Success"});
 })

 // Updating the specific user.
 
 app.patch("/users/:id",async function(request,response){
    const id = request.params.id;
    const body = request.body;
   await usermodel.findByIdAndUpdate(id, {gender: body.gender});
    response.json({status : "success"});
 })

const port = 8000;

app.listen(port);