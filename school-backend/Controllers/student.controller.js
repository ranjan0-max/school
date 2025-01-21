const Response = require('../Helpers/response.helper');
const { IST } = require('../Helpers/dateTime.helper');
const DB = require('../Helpers/crud.helper');
const Logger = require('../Helpers/logger');
const AuthHelper = require('../Helpers/auth.helper');
const controllerName = 'role.controller';

const Student = require('../Database/Models/student.model');
const User = require('../Database/Models/user.model');
const Role = require('../Database/Models/role.model');

const createStudent = async (req, res) => {
    try {
        const role = await DB.readOne(Role, { role: 'STUDENT' });

        const userExist = await DB.readOne(User, { user_id: req.body.name });

        let user_id = userExist?._id;
        if (!userExist) {
            const userData = {
                user_id: req.body.name,
                password: await AuthHelper.generateHash('secret'),
                role: role._id,
                active_status: true,
                created_at: IST(),
                updated_at: IST()
            };

            const user = await DB.create(User, userData);
            user_id = user?.[0]?._id;
        }

        const data = {
            ...req.body,
            role_id: role._id,
            user_id: user_id,
            created_at: IST(),
            updated_at: IST()
        };

        await DB.create(Student, data);

        return Response.success(res, {
            data: data,
            message: 'Student Created Successfully'
        });
    } catch (error) {
        Logger.error(`${controllerName} - createStudent - ${error.message}`);
        return Response.error(res, {
            data: {},
            message: error.message
        });
    }
};

// get the student list
const getStudentList = async (req, res) => {
    try {
        const students = await DB.findDetails(Student, req.query);

        return Response.success(res, {
            data: students,
            message: 'Student List Fetched Successfully'
        });
    } catch (error) {
        Logger.error(`${controllerName} - getStudentList - ${error.message}`);
        return Response.error(res, {
            data: [],
            message: error.message
        });
    }
};

// update the student
const updateStudent = async (req, res) => {
    try {
        const query = {
            _id: req.params.id
        };

        const data = {
            ...req.body,
            updated_at: IST()
        };

        await DB.updateOne(Student, { query, data });

        return Response.success(res, {
            data: {},
            message: 'Student Updated Successfully'
        });
    } catch (error) {
        Logger.error(`${controllerName} - updateStudent - ${error.message}`);
        return Response.error(res, {
            data: {},
            message: error.message
        });
    }
};

module.exports = {
    createStudent,
    getStudentList,
    updateStudent
};
