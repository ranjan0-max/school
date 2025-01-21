const express = require('express');
const SubjectController = require('../Controllers/subject.controller');
const router = express.Router();
const { authJwt, authorize } = require('../Middleware/apiAuth.middleware');

router
    .get('/', authJwt, SubjectController.getSubjectList)
    .post('/', authJwt, SubjectController.createSubject)
    .put('/:id', SubjectController.updateSubject);

module.exports = router;
