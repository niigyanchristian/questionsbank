const express = require('express');

const { getCourses } = require('../controllers/course');


const router = express.Router();

router.route('/:id').
get(getCourses)


module.exports = router;