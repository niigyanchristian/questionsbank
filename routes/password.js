const express = require('express');
const _ = require('lodash');
var fs = require('fs');
const multer = require('multer');
const PDF = require('../models/pasco');
const jwt = require('jsonwebtoken');
const { uploadPDF } = require('../controllers/admin');
const router = express.Router();




router.route('/').
get((req,res)=>{
    res.render('forgetpass');
});

module.exports = router;