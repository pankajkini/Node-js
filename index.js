const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
var session = require('express-session')
var cookieParser = require('cookie-parser');


const app = express();

app.use(express.static('public'));
app.set('view engine', 'ejs')

// connect to db 
mongoose.connect(mongoURL = "mongodb://localhost:27017/logindb")
.then(() => console.log('mongodb conected successfully'))
.catch(err => console.log(err))


// Middleware 
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true,
    //cookie: { secure: true }
  }))




// bring  routes

const index = require('./routes/auth')

// Actual routes

app.use('/',index)


  
const port = process.env.port || 1000
app.listen(port, () => {
    console.log("Server running on port number "+port);
})