const Response = require('../Helpers/response.helper');
const { IST } = require('../Helpers/dateTime.helper');
const { generateCustomError } = require('../Helpers/error.helper');
const AuthHelper = require('../Helpers/auth.helper');
const DB = require('../Helpers/crud.helper');
const Logger = require('../Helpers/logger');
const controllerName = 'auth.controller.js';

const User = require('../Database/Models/user.model');

const {
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET,
  ACCESS_TOKEN_EXPIRY,
  REFRESH_TOKEN_EXPIRY,
  APP_NAME
} = process.env;

/**
 * @description Tries to login the user with provided body
 * @param req {object} Express req object
 * @param res {object} Express res object
 * @returns Express res object with the success/failure and data
 */
const login = async (req, res, next) => {
  try {
    let query = {};
    if (req.body?.user_id) query.user_id = req.body.user_id;
    else await generateCustomError('BAD REQUEST', 'bad_request', 400);

    const user = await DB.population(User, {
      queryString: query,
      popString: 'role',
      popExclude: { updated_at: 0, role_active: 0, __v: 0, created_at: 0 }
    });

    if (!user.length)
      await generateCustomError(
        'Please register and try again !',
        'user_not_found',
        401,
        'clientUnautorized'
      );
    if (user[0]?.is_deleted) await generateCustomError('Account Blocked !', 'account_blocked', 400);
    // if (!user[0]?.activeStatus)
    //   await generateCustomError(
    //     "Account Not Active !",
    //     "account_deactive",
    //     400
    //   );

    await AuthHelper.compareHash(req.body.password, user[0].password);
    delete user[0].password;
    delete user[0].is_deleted;
    delete user[0].refresh_token;

    const accessToken = await AuthHelper.generateToken(
      {
        id: user[0]._id,
        role: user[0].role,
        activeStatus: user[0].activeStatus
      },
      ACCESS_TOKEN_EXPIRY,
      ACCESS_TOKEN_SECRET
    );

    // eslint-disable-next-line max-len
    const refreshToken = await AuthHelper.generateToken(
      {
        id: user[0].id,
        role: user[0].role,
        activeStatus: user[0].activeStatus
      },
      REFRESH_TOKEN_EXPIRY,
      REFRESH_TOKEN_SECRET
    );

    res.cookie(APP_NAME, JSON.stringify({ refreshToken }), {
      secure: true,
      httpOnly: true,
      expires: IST('date', 7, 'days'),
      sameSite: 'none'
    });

    Response.success(res, {
      data: {
        accessToken: accessToken,
        user: { ...user[0] },
        refresh_token: refreshToken,
        device_token: req.body.token,
        date: IST()
      },
      message: 'Logged-In SuccessFully'
    });

    await DB.update(User, {
      query: { _id: user[0].id },
      data: {
        device_token: req.body.token,
        refresh_token: refreshToken,
        updated_at: IST('date')
      }
    });
  } catch (error) {
    Logger.error(error.message + 'at login function ' + controllerName);
    return Response.error(res, {
      data: [],
      message: 'Something Went Wrong'
    });
  }
};

const getUser = async (req, res, next) => {
  try {
    const user = await DB.population(User, {
      queryString: { _id: req.query.auth_user_id },
      popString: 'role',
      queryExclude: {
        password: 0,
        is_deleted: 0,
        refresh_token: 0,
        created_at: 0
      },
      popExclude: {
        updated_at: 0,
        role_active: 0,
        __v: 0,
        created_at: 0
      }
    });
    if (!user.length)
      await generateCustomError('Please register and try again !', 'user_not_found', 400);
    if (user[0]?.is_deleted) await generateCustomError('Account Blocked !', 'account_blocked', 400);

    Response.success(res, {
      data: {
        user: user[0],
        date: IST()
      },
      message: 'Logged-In User Data Found'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @description Tries to login the user with provided body
 * @param req {Object} Express req object
 * @param res {Object} Express res object
 * @returns Express res object with the success/failure and generated token
 */
const generateTokens = async (req, res, next) => {
  try {
    let token = JSON.parse(req.cookies[APP_NAME]);
    token = token?.refreshToken;

    if (!token) {
      return Response.unauthorized(res, {
        data: [],
        message: 'Invalid data or data missing'
      });
    }

    const verify = await AuthHelper.verifyToken(token, REFRESH_TOKEN_SECRET);

    const user = await DB.read(User, {
      _id: verify?.id,
      refresh_token: token,
      is_deleted: false
    });

    if (!user.length) {
      return Response.unauthorized(res, {
        data: [],
        message: 'Invalid Token Or User Blocked'
      });
    }

    const userData = {
      id: user[0]._id || user[0].id,
      name: user[0]?.name,
      user_id: user[0]?.user_id,
      role: user[0]?.role,
      image: user[0]?.image
    };

    const accessToken = await AuthHelper.generateToken(
      userData,
      ACCESS_TOKEN_EXPIRY,
      ACCESS_TOKEN_SECRET
    );

    if (!accessToken) {
      return Response.badRequest(res, {
        data: [],
        message: 'Unable to generate access token'
      });
    }
    return Response.success(res, { data: [{ accessToken }] });
  } catch (error) {
    return Response.error(res, {
      data: [],
      message: 'Something Went Wrong'
    });
  }
};
/**
 * @description Tries to Logout the user with provided Req Data
 * @param req {Object} Express req object
 * @param res {Object} Express res object
 * @returns Express res object with the success/failure and generated token
 */
const logout = async (req, res, next) => {
  try {
    const authUserId = req.query.auth_user_id;
    // Check if auth_user_id is provided
    if (!authUserId) {
      return Response.error(res, {
        message: 'auth_user_id is required.',
        statusCode: 400
      });
    }

    // Check if the user exists (you may need to implement this function)
    if (!authUserId) {
      return Response.error(res, {
        message: 'User not found.',
        statusCode: 404
      });
    }

    // Perform the logout actions
    await DB.update(User, {
      query: { _id: authUserId },
      data: {
        refresh_token: '',
        device_token: '',
        active_status: false,
        updated_at: IST('date')
      }
    });

    res.clearCookie(APP_NAME);
    return Response.success(res, { message: 'User logged out!' });
  } catch (error) {
    console.log('error', error);
    next(error);
  }
};

module.exports = {
  login,
  logout,
  generateTokens,
  getUser
};
