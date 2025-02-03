const express = require('express');
const AttendanceController = require('../Controllers/attendance.controller');
const router = express.Router();
const { authJwt, authorize } = require('../Middleware/apiAuth.middleware');

router
    .get('/', authJwt, AttendanceController.getAttendanceList)
    .get('/history', authJwt, AttendanceController.getAttendanceHistory)
    .get('/student_name', authJwt, AttendanceController.getStudentNamesList)
    .post('/', authJwt, AttendanceController.createAttendance)
    .put('/:id', authJwt, AttendanceController.updateAttendance);

module.exports = router;
