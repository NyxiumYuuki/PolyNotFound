const users = require("../controllers/user.controller");
const {cors, options} = require("../config/cors.config");
module.exports = app => {
  let router = require("express").Router();

  // Authenticate a User
  router.post("/user/auth", cors(options), users.auth);

  // Logout a User
  router.delete("/user/logout", cors(options), users.logout);

  // Request password reset with email
  router.post("/user/resetPass", cors(options), users.resetPass);

  // Create and Save a new User
  router.post("/user/create", cors(options), users.create);

  // Retrieve all Users if admin
  router.get("/user/findAll", cors(options), users.findAll);

  // Find single User from id if admin or session id
  router.get("/user/findOne/:id", cors(options), users.findOne);

  // Update a User from id if admin or session id
  router.put("/user/update/:id", cors(options), users.update);

  // Delete a User from id if admin or session id
  router.delete("/user/delete/:id", cors(options), users.delete);

  // Delete all Users if superAdmin
  router.delete("/user/deleteAll", cors(options), users.deleteAll);

  // Get all Roles depending on the User session id
  router.get("/user/roles", cors(options), users.roles);

  // Get 1 or multiple ad adapted to the User session id
  router.get("/user/ad", cors(options), users.ad);

  // Get History
  router.get("/user/history", cors(options), users.history);

  app.use('/api', router);
};
