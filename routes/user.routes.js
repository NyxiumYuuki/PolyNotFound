const users = require("../controllers/user.controller");
//const {cors, corsOptions} = require("../config/cors.config");
module.exports = app => {
  let router = require("express").Router();

  // Authenticate a User
  router.post("/user/auth",  users.auth);

  // Logout a User
  router.delete("/user/logout",  users.logout);

  // Request password reset with email
  router.post("/user/resetPass",  users.resetPass);

  // Create and Save a new User
  router.post("/user/create",  users.create);

  // Retrieve all Users if admin
  router.get("/user/findAll",  users.findAll);

  // Find single User from id if admin or session id
  router.get("/user/findOne/:id",  users.findOne);

  // Update a User from id if admin or session id
  router.put("/user/update/:id",  users.update);

  // Delete a User from id if admin or session id
  router.delete("/user/delete/:id",  users.delete);

  // Delete all Users if superAdmin
  router.delete("/user/deleteAll",  users.deleteAll);

  // Get all Roles depending on the User session id
  router.get("/user/roles",  users.roles);

  // Get 1 or multiple ad adapted to the User session id
  router.get("/user/ad",  users.ad);

  // Get History
  router.get("/user/history",  users.history);

  app.use('/api', router);
};
