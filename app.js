const express = require('express');
const morgan = require('morgan');
const path = require('path');
const BodyParser = require("body-parser");
const hbs = require('express-handlebars')
const mongo = require("mongoose");

// Routers
const userRouters = require('./src/routes/routes');

const app = express();

// Set configs
app.set("views", __dirname + "/src/views");
app.engine('hbs', hbs({
    extname:'hbs',
    defaultLayout: 'layout',
    layoutsDir: __dirname + "/src/views"
}));
app.set("view engine", "hbs");
app.set("port",process.env.PORT || 1337);

app.use(express.static(__dirname + "/src/public"));
app.use(BodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));

// Set Routers
app.use('/user',userRouters);

//Connection Database
mongo.Promise = global.Promise;
mongo.connect("mongodb://localhost/YOUR_DATABASE").then((req,res) => {
    console.log("[+] Connected to Database");
}).catch((err) => {
    console.log("[!] Error connecting to Database"+err);
});



app.get('/', (req, res) =>{
    res.send('Hello Word');
});


app.listen(app.get('port'), (req,res) => {
    console.log('[+] Web server runing on http://localhost:'+app.get('port'))
});