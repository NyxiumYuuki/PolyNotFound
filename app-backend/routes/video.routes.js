const videos = require("../controllers/video.controller");
module.exports = app => {
  let router = require("express").Router();

  // Search Videos
  router.get("/video/search", videos.search);

  // Get Video with id of source
  router.get("/video/get/:id", videos.get);

  // Create a new Video
  router.post("/video/create/:id", videos.create);

  // Retrieve all Videos
  router.get("/video/findAll", videos.findAll);

  // Find single Video with id
  router.get("/video/findOne/:id", videos.findOne);

  // Update Video with id
  router.put("/video/update/:id", videos.update);

  // Delete Video with id
  router.delete("/video/delete/:id", videos.delete);

  // Delete all Videos
  router.delete("/video/deleteAll", videos.deleteAll);

  app.use('/api', router);
};
