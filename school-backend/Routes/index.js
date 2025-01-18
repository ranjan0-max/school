const authRoute = require('./auth.routes');
const UserRoute = require('./user.routes');
const menusRoute = require('./menu.routes');
const rolesRoute = require('./role.routes');
const studentRoute = require('./student.routes');
const classRoute = require('./classes.routes');
const app = require('../app');

//! always remove  before pushing to server
function appRouter() {
  app.use('/v1/auth', authRoute);
  //\\ ==============================|| START: UI MASTERS ROUTES ||============================== //\\
  app.use('/v1/users', UserRoute);
  app.use('/v1/menu', menusRoute);
  app.use('/v1/role', rolesRoute);
  app.use('/v1/student', studentRoute);
  app.use('/v1/class', classRoute);
  //\\ ==============================|| END: UI MASTERS ROUTES ||============================== //\\
}

module.exports = appRouter;
