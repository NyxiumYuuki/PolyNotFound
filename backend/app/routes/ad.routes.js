const ads = require("../controllers/ad.controller");
module.exports = app => {
  let router = require("express").Router();

  // Create a new Ad
  router.post("/user/ad", ads.create);

  // Retrieve all Ads
  router.get("/user/ad", ads.findAll);

  // Retrieve a single Ad with id
  router.get("/user/ad/:id", ads.findOne);

  // Update an Ad with id
  router.put("/user/ad/:id", ads.update);

  // Delete an Ad with id
  router.delete("/user/ad/:id", ads.delete);

  // Delete all Ads
  router.delete("/user/ad", ads.deleteAll);

  app.use('/api', router);
};
