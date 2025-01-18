const Response = require('../Helpers/response.helper');
const { IST } = require('../Helpers/dateTime.helper');
const DB = require('../Helpers/crud.helper');
const Logger = require('../Helpers/logger');
const controllerName = 'role.controller';

const Role = require('../Database/Models/role.model');

// create the role
const createRole = async (req, res) => {
  try {
    await DB.isUnique(Role, { email: req.body.role });

    const data = {
      ...req.body
    };
    await DB.create(Role, data);

    return Response.success(res, {
      data: data,
      message: 'Role Created SuccessFully'
    });
  } catch (error) {
    Logger.error(error.message + ' at createRole function ' + controllerName);
    return Response.error(res, {
      data: [],
      message: error.message
    });
  }
};

// get role by different query parameters
const getRole = async (req, res) => {
  try {
    delete req.query.auth_user_id;
    delete req.query.user_role;

    const query = {
      ...req.query
    };
    const role = await DB.findDetails(Role, query);

    return Response.success(res, {
      data: role,
      message: 'Role Found'
    });
  } catch (error) {
    Logger.error(error.message + ' at getRole function ' + controllerName);
    return Response.error(res, {
      data: [],
      message: error.message
    });
  }
};

module.exports = {
  createRole,
  getRole
};
