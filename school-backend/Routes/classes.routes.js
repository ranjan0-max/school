const express = require('express');
const ClassesController = require('../Controllers/classes.controller');
const router = express.Router();
const { authJwt, authorize } = require('../Middleware/apiAuth.middleware');

router
    .get('/', authJwt, ClassesController.getClassList)
    .post('/', authJwt, ClassesController.createClass)
    .put('/:id', authJwt, ClassesController.updateClass);

module.exports = router;
