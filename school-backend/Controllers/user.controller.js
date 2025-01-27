const Response = require('../Helpers/response.helper');
const Logger = require('../Helpers/logger');
const DateTime = require('../Helpers/dateTime.helper');
const DB = require('../Helpers/crud.helper');
const AuthHelper = require('../Helpers/auth.helper');
const controllerName = 'user.controller.js';

const mongoose = require('mongoose');
const User = require('../Database/Models/user.model');

/**
 * @description Create User
 * @param model mongoose User model && Role
 * @param data string: Request.body
 * @returns object: { success: boolean, error: boolean || error }
 */
const createUser = async (req, res, next) => {
    try {
        // checking email is unique
        await DB.isUnique(User, { user_id: req.body.user_id });

        if (req.body.password) {
            const passwordHash = await AuthHelper.generateHash(req.body.password);
            // create user Data
            const data = {
                ...req.body,
                password: passwordHash,
                created_at: DateTime.IST('date'),
                updated_at: DateTime.IST('date')
            };
            await DB.create(User, data);

            return Response.success(res, {
                data: data,
                message: 'User Created SuccessFully'
            });
        } else {
            return Response.error(res, {
                data: [],
                message: 'Password is required'
            });
        }
    } catch (error) {
        if (error.name === 'NON_UNIQUE') {
            Logger.error(error.message + 'at createUser function ' + controllerName);
            return Response.error(res, {
                data: [],
                message: 'Email already taken'
            });
        }
        Logger.error(error.message + 'at createUser function ' + controllerName);
        return Response.error(res, {
            data: [],
            message: error.message
        });
    }
};
/**
 * @description Get Users
 * @param model mongoose User model && Role
 * @param data string: Request.body
 * @returns object: { success: boolean, error: boolean || error }
 */
const getAllUser = async (req, res, next) => {
    try {
        const roleNamesToInclude = ['PRINCIPAL'];
        const Users = await User.aggregate([
            {
                $lookup: {
                    from: 'roles',
                    localField: 'role',
                    foreignField: '_id',
                    as: 'roles'
                }
            },
            {
                $unwind: {
                    path: '$roles',
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $match: {
                    'roles.role': { $nin: ['PRINCIPAL'] }
                }
            },
            {
                $addFields: {
                    role: '$roles.role',
                    role_id: '$roles._id'
                }
            },
            {
                $project: {
                    _id: 1,
                    role: 1,
                    role_id: 1,
                    user_id: 1
                }
            }
        ]);

        if (Users.length > 0) {
            return Response.success(res, {
                data: Users,
                count: Users.length,
                message: 'Users Found'
            });
        }
        return Response.success(res, {
            data: [],
            count: 0,
            message: 'No Users Found'
        });
    } catch (error) {
        console.log(error);
        Logger.error(error.message + 'at getAllUser function ' + controllerName);
        return Response.error(res, {
            data: [],
            message: error.message
        });
    }
};

/**
 * @description Update User Based on Id
 * @param model mongoose User model && Role
 * @param data string: Request.Params.Id
 * @returns object: { success: boolean, error: boolean || error }
 */

const updateUser = async (req, res, next) => {
    try {
        const myquery = { _id: req.params.id };
        const data = { ...req.body };

        if (req.body.password) {
            data.password = await AuthHelper.generateHash(req.body.password);
        }

        await DB.update(User, { data, query: myquery });
        return Response.success(res, {
            data: data,
            message: 'User Details Updated!'
        });
    } catch (error) {
        Logger.error(error.message + ' at updateUser function ' + controllerName);
        return Response.error(res, {
            data: [],
            message: error.message
        });
    }
};

module.exports = {
    createUser,
    getAllUser,
    updateUser
};
