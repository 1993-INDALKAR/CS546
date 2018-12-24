const express = require("express");
const bodyParser = require("body-parser");
const path = require('path');
const hbs = require('express-handlebars');

const app = express();

const cookieParser = require("cookie-parser");



app.engine('hbs', hbs({ extname: 'hbs', defaultLayout: 'main', layoutsdir: __dirname + '/views/layouts' }));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');



app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/public", express.static(__dirname + "/public/"));

const configRoutes = require('./routes');


// app.get("/",(req,res)=>{
//     let filePath = path.join(__dirname,"../public/index.html");
//     res.sendFile(filePath);
// });

// app.get("*",(req,res)=>{
//     res.status(400).json({message:"Page not found"});
// });


configRoutes(app);

app.listen(3000, (res, err) => {
  if (err) throw console.log('Problem in connecting to Localhost');
  console.log("We've now got a server!");
  console.log("Your routes will be running on http://localhost:3000");

  if (process && process.send) process.send({ done: true });
});