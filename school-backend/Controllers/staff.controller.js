const Response = require('../Helpers/response.helper');
const { IST } = require('../Helpers/dateTime.helper');
const DB = require('../Helpers/crud.helper');
const Logger = require('../Helpers/logger');
const controllerName = 'role.controller';

const staff = require('../Database/Models/staff.model');
const User = require('../Database/Models/user.model');
const Role = require('../Database/Models/role.model');

// create new staff
const createStaff = async (req, res) => {
    try {
        await DB.isUnique(staff, { contact_number: req.body.contact_number, email: req.body.email });

        const role = await DB.readOne(Role, { role: 'STAFF' });

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

        await DB.create(staff, data);

        return Response.success(res, {
            data: data,
            message: 'Staff Created Successfully'
        });
    } catch (error) {
        Logger.error(`${controllerName} - createStaff - ${error.message}`);
        return Response.error(res, {
            data: {},
            message: error.message
        });
    }
};

// get staff list
const getStaffList = async (req, res) => {
    try {
        const staffs = await DB.read(staff, req.query);

        return Response.success(res, {
            data: staffs,
            message: 'Staff List'
        });
    } catch (error) {
        Logger.error(`${controllerName} - getStaffList - ${error.message}`);
        return Response.error(res, {
            data: [],
            message: error.message
        });
    }
};

// update staff details
const updateStaff = async (req, res) => {
    try {
        const query = {
            _id: req.params.id
        };

        const data = {
            ...req.body,
            updated_at: IST('database')
        };

        await DB.updateOne(staff, query, data);

        return Response.success(res, {
            data: data,
            message: 'Staff Updated Successfully'
        });
    } catch (error) {
        Logger.error(`${controllerName} - updateStaff - ${error.message}`);
        return Response.error(res, {
            data: {},
            message: error.message
        });
    }
};

module.exports = {
    createStaff,
    getStaffList,
    updateStaff
};
