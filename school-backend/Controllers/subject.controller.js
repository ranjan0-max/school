const Response = require('../Helpers/response.helper');
const { IST } = require('../Helpers/dateTime.helper');
const DB = require('../Helpers/crud.helper');
const Logger = require('../Helpers/logger');
const controllerName = 'role.controller';

const Subject = require('../Database/Models/subject.model');

// create the subject
const createSubject = async (req, res) => {
    try {
        await DB.isUnique(Subject, { name: req.body.name });

        const data = {
            ...req.body,
            created_at: IST(),
            updated_at: IST()
        };

        await DB.create(Subject, data);

        return Response.success(res, {
            data: {},
            message: 'Subject Created Successfully'
        });
    } catch (error) {
        Logger.error(`${controllerName} - createSubject - ${error.message}`);
        return Response.error(res, {
            data: {},
            message: error.message
        });
    }
};

// get subject list
const getSubjectList = async (req, res) => {
    try {
        const subjects = await DB.findDetails(Subject, req.query);

        return Response.success(res, {
            data: subjects,
            message: 'Subject List Fetched Successfully'
        });
    } catch (error) {
        Logger.error(`${controllerName} - getSubjectList - ${error.message}`);
        return Response.error(res, {
            data: [],
            message: error.message
        });
    }
};

// update subject
const updateSubject = async (req, res) => {
    try {
        const query = {
            _id: req.params.id
        };

        const data = {
            ...req.body,
            updated_at: IST()
        };

        await DB.updateOne(Subject, { query, data });

        return Response.success(res, {
            data: {},
            message: 'Subject Updated Successfully'
        });
    } catch (error) {
        Logger.error(`${controllerName} - updateSubject - ${error.message}`);
        return Response.error(res, {
            data: {},
            message: error.message
        });
    }
};

module.exports = {
    createSubject,
    getSubjectList,
    updateSubject
};
