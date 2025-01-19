const Response = require('../Helpers/response.helper');
const { IST } = require('../Helpers/dateTime.helper');
const DB = require('../Helpers/crud.helper');
const Logger = require('../Helpers/logger');
const controllerName = 'role.controller';

const Teacher = require('../Database/Models/teacher.model');
const User = require('../Database/Models/user.model');
const Role = require('../Database/Models/role.model');

// create new teacher
const createTeacher = async (req, res) => {
    try {
        await DB.isUnique(Teacher, { contact_number: req.body.contact_number, email: req.body.email });

        const role = await DB.readOne(Role, { role: 'TEACHER' });

        const userExist = await DB.readOne(User, { user_id: req.body.name });

        let user_id = userExist._id;
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
            created_at: IST('database'),
            updated_at: IST('database')
        };

        await DB.create(Teacher, data);

        return Response.success(res, {
            data: data,
            message: 'Teacher Created Successfully'
        });
    } catch (error) {
        Logger.error(`${controllerName} - createTeacher - ${error.message}`);
        return Response.error(res, {
            data: {},
            message: error.message
        });
    }
};

// get teacher list
const getTeacherList = async (req, res) => {
    try {
        const teachers = await DB.read(Teacher, req.query);

        return Response.success(res, {
            data: teachers,
            message: 'Teacher List'
        });
    } catch (error) {
        Logger.error(`${controllerName} - getTeacherList - ${error.message}`);
        return Response.error(res, {
            data: [],
            message: error.message
        });
    }
};

// update teacher details
const updateTeacher = async (req, res) => {
    try {
        const query = {
            _id: req.params.id
        };

        const data = {
            ...req.body,
            updated_at: IST('database')
        };

        await DB.updateOne(Teacher, query, data);

        return Response.success(res, {
            data: data,
            message: 'Teacher Updated Successfully'
        });
    } catch (error) {
        Logger.error(`${controllerName} - updateTeacher - ${error.message}`);
        return Response.error(res, {
            data: {},
            message: error.message
        });
    }
};

module.exports = {
    createTeacher,
    getTeacherList,
    updateTeacher
};
