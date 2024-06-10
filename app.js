const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = 3000;

const dbconn = require('./dbConn/conn');
const taskRoute = require('./routes/tasks');
const userRoute = require('./routes/user');

app.use(bodyParser.json());

app.use('/api' , userRoute);
app.use('/api' , taskRoute);


app.listen(PORT , ()=>{
    console.log("Running...");
});