const express = require('express');
const _ = require('lodash');
const Course = require('../models/course');
const { getLocalStorage } = require('../hooks/useLocalStorage');

// const { loginUser } = require('../controllers/users');
// const { getAdminDashboard } = require('../controllers/students');
const router = express.Router();

router.route('/').
get((req,res)=>{ 
    const userDetails = getLocalStorage(req);
    console.log('=>',req.isAuthenticated())
    Course.find().
    then(courses=>{
        res.render('index',{courses:_.sampleSize(courses,6),authenticated:req.isAuthenticated(),admin:userDetails.admin})
        // res.render('index',{courses})
    }).
    catch(e=>{
        console.log('error @ index->',e)
    })
});


module.exports = router;