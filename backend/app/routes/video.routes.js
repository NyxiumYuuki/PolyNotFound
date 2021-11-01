const videos = require("../controllers/video.controller");
module.exports = app => {
  let router = require("express").Router();

  // Search Video
  router.post("/video/search", videos.search);

  // Create a new Video
  router.post("/video/create", videos.create);

  // Retrieve all Videos
  router.get("/video/findAll", videos.findAll);

  // Retrieve a single Video with id
  router.get("/video/findOne/:id", videos.findOne);

  // Update a Video with id
  router.put("/video/update/:id", videos.update);

  // Delete a Video with id
  router.delete("/video/delete/:id", videos.delete);

  // Delete all Videos
  router.delete("/video/deleteAll", videos.deleteAll);

  app.use('/api', router);
};
