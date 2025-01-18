const express = require('express');
const StudentController = require('../Controllers/student.controller');
const router = express.Router();
const { authJwt, authorize } = require('../Middleware/apiAuth.middleware');

router
    .get('/', authJwt, StudentController.getStudentList)
    .post('/', authJwt, StudentController.createStudent)
    .put('/:id', StudentController.updateStudent);

module.exports = router;
