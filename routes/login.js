const express = require('express');
const _ = require('lodash');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const { loginUser } = require('../controllers/users');
const router = express.Router();

router.route('/').
get((req,res)=>{
    const err = req.query.err;
    res.render('login',{error:err?err:false})
}).
post(loginUser);


module.exports = router;