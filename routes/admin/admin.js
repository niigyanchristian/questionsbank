const express = require('express');
const multer = require('multer');

const { postDeletePDF, getAdminPage, getAddCourse, postAddCourse, getAddPasco, postAddPasco, getEditPasco, postEditPasco, getMembers, postMembers } = require('../../controllers/admin');
const { getEditCourse, postEditCourse, getDeleteCourse } = require('../../controllers/course');

const router = express.Router();
const upload = multer({storage:multer.memoryStorage()});

router.route('/').
get(getAdminPage);

router.route('/addcourse').
get(getAddCourse).
post(postAddCourse);

router.route('/editcourse/:id').
get(getEditCourse).
post(postEditCourse);

router.route('/deletecourse/id').
get(getDeleteCourse);



router.route('/addpasco').
get(getAddPasco).
post(upload.single('file'),postAddPasco)

router.route('/delpasco').
post(postDeletePDF);

router.route('/editpasco/:id').
get(getEditPasco).
post(upload.single('file'),postEditPasco);

router.route('/members').
get(getMembers).
post(postMembers);


module.exports = router;