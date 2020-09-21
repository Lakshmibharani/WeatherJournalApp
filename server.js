// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();
const bodyParser = require('body-parser');
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));

const port = 3000;

// Setup Server
const Server = app.listen(port, () => {
    console.log("Running on localhost: ${port}");
});
app.get('/projectData' , function(req, res){
    res.send(projectData);
}) 
app.post('/projectData' , function(req, res){
    projectData = {
        temp : req.body.temp,
        date : req.body.date,
        userResponse : req.body.userResponse
    };
    console.log(projectData);
});
