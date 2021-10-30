const users = require("../controllers/user.controller");
module.exports = app => {
  let router = require("express").Router();

  // Create a new User
  router.post("/user", users.create);

  // Retrieve all Users
  router.get("/users", users.findAll);

  // Retrieve a single User with id
  router.get("/user/:id", users.findOne);

  // Update a User with id
  router.put("/user/:id", users.update);

  // Delete a User with id
  router.delete("/user/:id", users.delete);

  // Delete all Users
  router.delete("/users", users.deleteAll);

  // Authenticate a User
  router.post("/user/auth", users.auth);

  // Logout a User
  router.delete("/user/logout", users.disconnect);

  app.use('/api', router);
};
