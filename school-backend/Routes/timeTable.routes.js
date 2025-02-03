const express = require('express');
const TimeTableController = require('../Controllers/timeTable.controller');
const router = express.Router();
const { authJwt, authorize } = require('../Middleware/apiAuth.middleware');

router
    .get('/', authJwt, TimeTableController.getTimeTableList)
    .get('/detail', authJwt, TimeTableController.getTimeTableDetails)
    .post('/', authJwt, TimeTableController.createTimeTable)
    .put('/:id', TimeTableController.updateTimeTable);

module.exports = router;
