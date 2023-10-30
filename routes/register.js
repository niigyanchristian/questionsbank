const express = require('express');
const { registerUser } = require('../controllers/users');

const router = express.Router();

router.route('/').
get((req,res)=>{
    const data = req.query.data;
    res.render('login',{error:data?true:false});
})
.post(registerUser);

module.exports = router;