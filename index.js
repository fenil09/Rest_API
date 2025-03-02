const express = require('express');
const app= express();
const fs =require('fs');
const users= require("./MOCK_DATA.json");
const { error } = require('console');
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
app.get("/users",function(request,response){
    response.setHeader("myheader","Fenil")
    // adding X before the header name can be seen as the best practice.

    response.json(users);
})

// Getting a particular user.

app.get("/users/:id",function(request,response){
    const id = Number(request.params.id);
    // getting the ID so that we can match use it for performing the matching logic
    const user = users.find(user => user.id === id);
    response.send(user);
})

// Creating a new user.

app.post("/users",function(request,response){
     const body = request.body;
     // Adding a check which would see if the user is sending all the fields with the request or not
     // if not we can handle it by using the 400 status code which stands for the bad request.
     if(!body.first_name || !body.last_name || !body.email || !body.gender){
       return response.status(400).send("Please provide all the fields")
     }
    users.push({
        id : users.length+1,
        first_name : body.first_name,
        last_name : body.last_name,
        email : body.email ,
        gender : body.gender,
    })
    // converting the JSON into string data.
    const userwritable = JSON.stringify(users);
       // adding the new data back to the json file.
    fs.writeFile("./MOCK_DATA.json",userwritable,function(err){
        if(err) console.log(err.message);
        else console.log("Writing finished");
    })
 
    response.status(201).send("New data added");
    // changing the status code to 201, indicating creation of a successfull entity.
})
// Removing a user

 app.delete("/users/:id",function(request,response){
    const id = Number(request.params.id)
    const index = users.findIndex(user => user.id === id);
    users.splice(index);
    response.send("User Removed successfully");
 })

 // Updating the specific user.
 
 app.patch("/users/:id",function(request,response){
    const id = Number(request.params.id);
    const user = users.find(user => user.id === id);
     Object.assign(user, request.body);
     response.send("User Updated Successfully");
 })


const port = 8000;

app.listen(port);