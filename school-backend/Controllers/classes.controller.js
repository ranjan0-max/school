const Response = require('../Helpers/response.helper');
const { IST } = require('../Helpers/dateTime.helper');
const DB = require('../Helpers/crud.helper');
const Logger = require('../Helpers/logger');
const controllerName = 'role.controller';

const Classes = require('../Database/Models/classes.model');

// create the class
const createClass = async (req, res) => {
    try {
        await DB.isUnique(Classes, { class_name: req.body.class_name });

        const data = {
            ...req.body,
            created_at: IST('database'),
            updated_at: IST('database')
        };

        await DB.create(Classes, data);

        return Response.success(res, {
            data: data,
            message: 'Class Created Successfully'
        });
    } catch (error) {
        Logger.error(`${controllerName} - createClass - ${error.message}`);
        return Response.error(res, {
            data: {},
            message: error.message
        });
    }
};

// get the class list
const getClassList = async (req, res) => {
    try {
        const classes = await DB.read(Classes, req.query);

        return Response.success(res, {
            data: classes,
            message: 'Class List'
        });
    } catch (error) {
        Logger.error(`${controllerName} - getClassList - ${error.message}`);
        return Response.error(res, {
            data: [],
            message: error.message
        });
    }
};

// update the class
const updateClass = async (req, res) => {
    try {
        const query = {
            _id: req.params.id
        };

        const data = {
            ...req.body,
            updated_at: IST('database')
        };

        await DB.update(Classes, query, data);

        return Response.success(res, {
            data: data,
            message: 'Class Updated Successfully'
        });
    } catch (error) {
        Logger.error(`${controllerName} - updateClass - ${error.message}`);
        return Response.error(res, {
            data: {},
            message: error.message
        });
    }
};

module.exports = {
    createClass,
    getClassList,
    updateClass
};
