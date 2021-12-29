const users = require("../controllers/user.controller");
const {cors, corsOptions} = require("../config/cors.config");
module.exports = app => {
  let router = require("express").Router();

  // Authenticate a User
  router.post("/user/auth", cors(corsOptions), users.auth);

  // Logout a User
  router.delete("/user/logout", cors(corsOptions), users.logout);

  // Request password reset with email
  router.post("/user/resetPass", cors(corsOptions), users.resetPass);

  // Create and Save a new User
  router.post("/user/create", cors(corsOptions), users.create);

  // Retrieve all Users if admin
  router.get("/user/findAll", cors(corsOptions), users.findAll);

  // Find single User from id if admin or session id
  router.get("/user/findOne/:id", cors(corsOptions), users.findOne);

  // Update a User from id if admin or session id
  router.put("/user/update/:id", cors(corsOptions), users.update);

  // Delete a User from id if admin or session id
  router.delete("/user/delete/:id", cors(corsOptions), users.delete);

  // Delete all Users if superAdmin
  router.delete("/user/deleteAll", cors(corsOptions), users.deleteAll);

  // Get all Roles depending on the User session id
  router.get("/user/roles", cors(corsOptions), users.roles);

  // Get 1 or multiple ad adapted to the User session id
  router.get("/user/ad", cors(corsOptions), users.ad);

  // Get History
  router.get("/user/history", cors(corsOptions), users.history);

  app.use('/api', router);
};
