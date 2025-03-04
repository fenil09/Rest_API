// Importing the usermodel which would help us to perform the CRUD operation with mongoDb.
const usermodel = require("../models/user");
// Getting all the users.
async function Getalluser(request,response){
    const alldatabaseuser =  await usermodel.find({});
    response.json(alldatabaseuser);
}

// Getting the user by ID
async function GetuserbyID(request,response){
    const founduser = await usermodel.findById(request.params.id);
 response.json(founduser);
}

// Creating a new User
async function CreateUser(request,response){
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
}

// deleting a user
async function DeleteUser(request,response){
    const id = request.params.id
       await usermodel.findByIdAndDelete(id);
       response.json({status : "Success"});
}

// updating the user
async function UpdateUser(request,response){
    const id = request.params.id;
    const body = request.body;
   await usermodel.findByIdAndUpdate(id, {gender: body.gender});
    response.json({status : "success"});
}

// Exporting all these controller function so that they can be used in the route file.
module.exports= {
    Getalluser,
    GetuserbyID,
    CreateUser,
    DeleteUser,
    UpdateUser
}