const express = require('express');
const { getPrograms } = require('../controllers/program');


const router = express.Router();

router.route('/:pname/').
get(getPrograms);


module.exports = router;