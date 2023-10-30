require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const session = require('express-session');
const passport = require('passport');
const MongoDBStore = require('connect-mongodb-session')(session);


const MongoDB = require('./utilities/connectMongoDB');

const homeRoute = require('./routes/index');
const adminHomeRoute = require('./routes/admin/admin');
const courseRoute = require('./routes/selected_course');
const programRoute = require('./routes/selected_program');
const loginRoute = require('./routes/login');
const registerRoute = require('./routes/register');
const forgetpassRoute = require('./routes/password');
const { removeLocalStorage } = require('./hooks/useLocalStorage');


const app = express(); 

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static("public"));
app.use("/uploads",express.static('uploads'));

try {
  console.log('CONNECTING TO DATABASE...');
  MongoDB();
  console.log('DATABASE CONNECTED!!!');
} catch (error) {
  console.log(error.message);
}
const store = new MongoDBStore({
    uri: process.env.URL,
    collection: 'sessions'
  });

app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    store:store
  }));;
app.use(passport.initialize());
app.use(passport.session());




//END POINTS
app.get('/',homeRoute);
app.use('/admin',adminHomeRoute);
app.use('/courses',courseRoute);
app.use('/programs',programRoute);
app.use('/register',registerRoute);
app.use('/login',loginRoute);
app.use('/forgetpass',forgetpassRoute);
app.get("/logout", function(req, res) {
    req.logout((err)=>{
     if(!err){
         removeLocalStorage(req,res)
        //  res.redirect('/');
     }
    });
 });
//  404 PAGE
app.use((req,res)=>res.render("404",{message:"Sorry can't find that!"}));



app.listen(process.env.PORT,()=>{
    console.log(`EngSpace Is Running On Port ${process.env.PORT}`);
});