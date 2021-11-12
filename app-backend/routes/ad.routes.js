const ads = require("../controllers/ad.controller");
module.exports = app => {
  let router = require("express").Router();

  // Create a new Ad
  router.post("/ad/create", ads.create);

  // Retrieve all Ads
  router.get("/ad/findAll", ads.findAll);

  // Retrieve a single Ad with id
  router.get("/ad/findOne/:id", ads.findOne);

  // Update an Ad with id
  router.put("/ad/update/:id", ads.update);

  // Delete an Ad with id
  router.delete("/ad/delete/:id", ads.delete);

  // Delete all Ads
  router.delete("/ad/deleteAll", ads.deleteAll);

  app.use('/api', router);
};
