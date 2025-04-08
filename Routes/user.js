// first creating the instance of express
const express = require('express');
const path = require('path')
// Storing all the power of express in application named constant.
// we would be using express server to interact with the mongodb in which
// application constant would ne helping us.
const application = express();
const multer = require('multer')
const storage = multer.diskStorage({
    destination : function(req,file,cb){
        cb(null,'./uploads')
    },
    filename: function (req,file,cb){
        cb(null, `${Date.now}-${file.originalname}`)
    }
})
const upload = multer({storage})
// Okay so we have just created an help object which is pointing towards the controller which
// has all the controlling functions like getting a user, updating a user etc..
const help = require("../controllers/user")


// We just put this middleware helping to parse the incoming request from clients and convert the raw encoded data
// into javascript objects.
application.use(express.urlencoded({extended:false}));
application.set('view engine','ejs')
application.set('views', path.resolve('./views'))
// All of our routes helping us to get, post,update and delete.
// so whenever the user is on any of the route instead of creating a function to handle the request directly in the route
// we would be using controller to handle that request like if user says get/users then the controller would be getting all the user
// meaning invoking the getalluser function.
application.get("/fileupload",help.handlefileuploadrouting)
application.post('/upload',upload.single('profileImage'),(request,response)=>{
    console.log('uploadedfile:', request.file)
    response.render('fileupload')
})
application.get("/users",help.Getalluser);
application.get("/users/:id",help.GetuserbyID);
application.post("/users",help.CreateUser)
 application.delete("/users/:id",help.DeleteUser) 
 application.patch("/users/:id",help.UpdateUser)

 module.exports = application