const misc = require("../controllers/misc.controller");
module.exports = app => {
  let router = require("express").Router();

  // Get all interests available
  router.get("/misc/getInterests", misc.getInterests);

  app.use('/api', router);
};
