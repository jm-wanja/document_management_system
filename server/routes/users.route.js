const Router = require('express').Router();
const { User } = require('../controllers');


/* /users routes */
Router.route('/users')
  .post(User.create)
  .get(User.list);

/* /users/:id routes */
Router.route('/users/:id')
  .delete(User.delete)
  .get(User.find)
  .put(User.update);

/* search/users routes */
Router.route('/search/users')
  .get(User.findByName);

module.exports.UserRouter = Router;