const ads = require("../controllers/ad.controller");
module.exports = app => {
  let router = require("express").Router();

  // Create a new Ad
  router.post("/ad/create", ads.create);

  // Retrieve all Ad from id if admin or session id
  router.get("/ad/findAll", ads.findAll);

  // Find single Ad from id if admin or session id
  router.get("/ad/findOne/:id", ads.findOne);

  // Update a Ad with ad id
  router.put("/ad/update/:id", ads.update);

  // Delete a Ad with ad id
  router.delete("/ad/delete/:id", ads.delete);

  // Delete all Ad from id if admin or session id
  router.delete("/ad/deleteAll", ads.deleteAll);

  app.use('/api', router);
};
