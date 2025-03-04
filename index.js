
// so we are importing the instance of express which is generally application() which holds all the power of express in routes file.
// we would be using it to start the server at port 8000.
const expressapp= require("./Routes/user");
// creating a port on which the express server would be listening.
const port = 8000;
expressapp.listen(port);


// Importing the connectmongodb function from the connection.js file and then just using that constant to call the function 
// which would be establishing our connection with database.
const connectmongodb = require("./connection");
connectmongodb();