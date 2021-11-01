const users = require("../controllers/user.controller");
module.exports = app => {
  let router = require("express").Router();

  // Create a new User
  router.post("/user/create", users.create);

  // Retrieve all Users
  router.get("/user/findAll", users.findAll);

  // Retrieve a single User with id if admin
  router.get("/user/findOne/:id", users.findOne);

  // Retrieve a single User with session id
  router.get("/user/findOne", users.findOne);

  // Update a User with id if admin
  router.put("/user/update/:id", users.update);

  // Update a User with session id
  router.put("/user/update", users.update);

  // Delete a User with id
  router.delete("/user/delete/:id", users.delete);

  // Delete all Users
  router.delete("/user/deleteAll", users.deleteAll);

  // Authenticate a User
  router.post("/user/auth", users.auth);

  // Logout a User
  router.delete("/user/logout", users.logout);

  // Get all Roles depending on the role of the User
  router.get("/user/roles", users.roles);

  app.use('/api', router);
};
