const users = require("../controllers/user.controller");
module.exports = app => {
  let router = require("express").Router();

  router.post("/user/create", users.create);

  router.get("/user/findAll", users.findAll);

  router.get("/user/findOne/:id", users.findOne);

  router.put("/user/update/:id", users.update);

  router.delete("/user/delete/:id", users.delete);

  router.delete("/user/deleteAll", users.deleteAll);

  router.post("/user/auth", users.auth);

  router.delete("/user/logout", users.logout);

  router.get("/user/roles", users.roles);

  app.use('/api', router);
};
