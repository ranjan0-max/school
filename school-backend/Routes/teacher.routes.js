const express = require('express');
const TeacherController = require('../Controllers/teacher.controller');
const router = express.Router();
const { authJwt, authorize } = require('../Middleware/apiAuth.middleware');

router
    .get('/', authJwt, TeacherController.getTeacherList)
    .post('/', authJwt, TeacherController.createTeacher)
    .put('/:id', TeacherController.updateTeacher);

module.exports = router;
