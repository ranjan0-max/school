const express = require('express');
const StaffController = require('../Controllers/staff.controller');
const router = express.Router();
const { authJwt, authorize } = require('../Middleware/apiAuth.middleware');

router
    .get('/', authJwt, StaffController.getStaffList)
    .post('/', authJwt, StaffController.createStaff)
    .put('/:id', StaffController.updateStaff);

module.exports = router;
