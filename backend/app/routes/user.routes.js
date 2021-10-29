const users = require("../controllers/user.controller");
module.exports = app => {
  let router = require("express").Router();

  // Create a new User
  router.post("/", users.create);

  // Retrieve all Users
  router.get("/", users.findAll);

  // Retrieve a single User with id
  router.get("/:id", users.findOne);

  // Update a User with id
  router.put("/:id", users.update);

  // Delete a User with id
  router.delete("/:id", users.delete);

  // Delete all Users
  router.delete("/", users.deleteAll);

  // Authenticate a User
  router.post("/auth", users.auth);

  // Disconnect a User
  router.delete("/auth/disconnect", users.disconnect);

  app.use('/api/users', router);
};