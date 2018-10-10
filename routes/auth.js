const express = require('express')
const router = express.Router();
const bcrypt = require('bcryptjs');
const app = express();


// import schema 

const newUser = require('../models/users');

// Set templete ejs

app.set('view engine', 'ejs');

// @type    GET
//@route    /auth/index
// @desc    route for index
// @access  PUBLIC

router.get("/",(req,res,next) => {
    res.render('index');
})

// @type    GET
//@route    /auth/loginPage
// @desc    route for loginPage
// @access  PUBLIC

router.get('/loginPage',(req,res,next) => {
    res.render('login')
})

// @type    POST
//@route    /auth/login
// @desc    route for login
// @access  PUBLIC

router.post('/login',(req,res,next) => {
    const email = req.body.email
    const password = req.body.password
    newUser.findOne({email})
    .then(person => {
        if(!person){
            res.json("email is wrong")
        }
        else{
            // Load hash from your password DB.
            bcrypt.compare(password,person.password)
            .then(isCorrent => {
                if(isCorrent){
                    
                    res.json("Login Successful")
                }
                else{
                    res.status(400).json("password wrong")
                }
            })
            .catch(err => console.log(err))
        }
    })
    .catch(err => console.log(err))
})

// @type    GET
//@route    /auth/signup
// @desc    route for signup
// @access  PUBLIC

router.get("/signupPage",(req,res,next) =>{
    res.render("signup");
})

// @type    POST
//@route    /auth/signup
// @desc    route for signup
// @access  PUBLIC

router.post('/signup',(req,res,next) =>{
    newUser.findOne({email : req.body.email})
    .then(person => {
        if(person){
            res.status(400).json({email : "email already register"})
        }
        else{
            const newPerson = new newUser({
                name : req.body.name,
                email : req.body.email,
                password : req.body.password
            })
            bcrypt.genSalt(10, function(err, salt) {
                bcrypt.hash(newPerson.password, salt, function(err, hash) {
                    // Store hash in your password DB.
                    newPerson.password = hash;
                    newPerson.save()
                    .then(person => res.json(person))
                    .catch(err => console.log(err))
                });
            });
           
        }
    })
    .catch(err => console.log(err))
})

module.exports=router;