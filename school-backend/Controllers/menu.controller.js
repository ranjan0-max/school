const Menu = require('../Database/Models/menu.model');
const UserConfig = require('../Database/Models/userConfig.model');
const Logger = require('../Helpers/logger');
const Response = require('../Helpers/response.helper');
const DateTime = require('../Helpers/dateTime.helper');
const DB = require('../Helpers/crud.helper');
const controllerName = 'menu.controller.js';

//\\----------------------- Get All Selected Or Not Selected Menu For LOGGED IN USER -----------------------\\//

const getAllMenus = async (req, res, next) => {
  try {
    const userConfigMenus = await UserConfig.find({
      user_id: req.query.auth_user_id
    });

    const allMenus = await Menu.find();

    const setMenuKey = (menu) => {
      if (userConfigMenus.length && userConfigMenus[0].config.includes(menu.id))
        menu.accesss = true;
      if (menu?.children && menu.children.length) {
        menu.children = menu.children.filter(setMenuKey);
      }
      return menu;
    };

    const userMenu = allMenus.filter(setMenuKey);

    // const sidebar = {};
    // userMenu.map((menu) => (sidebar[menu.id] = menu));

    return Response.success(res, {
      data: { userMenu },
      message: 'All Menu Founds'
    });
  } catch (error) {
    Logger.error(error.message + 'at getAllMenus function ' + controllerName);
    return Response.error(res, {
      data: [],
      message: error.message
    });
  }
};

//\\----------------------- Get All Selected Or Not Selected Menu For Given Id Use -----------------------\\//
// const getUserConfigMenus = async (req, res, next) => {
//     try {
//         const userConfigMenus = await UserConfig.find({ user_id: req.params.id });

//         const allMenus = await Menu.find();
//         const setMenuKey = (menu) => {
//             if (userConfigMenus.length && userConfigMenus[0].config.includes(menu.id)) menu.accesss = true;
//             if (menu?.children && menu.children.length) {
//                 menu.children = menu.children.filter(setMenuKey);
//             }
//             return menu;
//         };
//         const userMenu = allMenus.filter(setMenuKey);

//         return Response.success(res, {
//             data: { userMenu },
//             message: 'User Config Found'
//         });
//     } catch (error) {
//         next(error);
//     }
// };

//\\----------------------- Create Menu-----------------------//\\

const postMenu = async (req, res, next) => {
  try {
    // Create Side Bar Menu
    const menu = {
      menu_id: req.body.menu_id,
      id: req.body.id,
      title: req.body?.title,
      type: req.body?.type,
      icon: req.body?.icon,
      accesss: req.body?.accesss,
      children: req.body?.children,
      created_at: DateTime.IST('date'),
      updated_at: DateTime.IST('date')
    };
    await DB.create(Menu, menu);

    return Response.success(res, {
      data: menu,
      message: 'Menu Added SuccessFully'
    });
  } catch (error) {
    Logger.error(error.message + 'at postMenu function ' + controllerName);
    return Response.error(res, {
      data: [],
      message: error.message
    });
  }
};

//\\----------------------- Post Search Values -----------------------//\\

const postSearchService = async (req, res, next) => {
  const searchTerm = req.query.q;
  try {
    const searchResults = await Item.find({ $text: { $search: searchTerm } });
    res.json(searchResults);
  } catch (error) {
    Logger.error(error.message + 'at postSearchService function ' + controllerName);
    return Response.error(res, {
      data: [],
      message: error.message
    });
  }
};

module.exports = {
  getAllMenus,
  postMenu,
  postSearchService
};
