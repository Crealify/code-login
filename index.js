const connectToMongo = require('./db');
const express = require('express');
const event_routes = require("./routes/event.js");
const user_routes = require("./routes/user.js")
const bodyParser = require("body-parser");


connectToMongo();

const app = express()
const port = 8000

app.use(express.json())

app.use(bodyParser.json());
app.use("/",event_routes);
app.use("/",user_routes);


app.listen(port, ()=>{
    console.log(`first project listening on port http://localhost:${port}`)
})
