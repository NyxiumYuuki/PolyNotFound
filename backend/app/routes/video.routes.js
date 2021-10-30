const videos = require("../controllers/video.controller");
module.exports = app => {
  let router = require("express").Router();

  // Search Video
  router.post("/videos", videos.search);

  // Create a new Video
  router.post("/video", videos.create);

  // Retrieve all Videos
  router.get("/videos", videos.findAll);

  // Retrieve a single Video with id
  router.get("/video/:id", videos.findOne);

  // Update a Video with id
  router.put("/video/:id", videos.update);

  // Delete a Video with id
  router.delete("/video/:id", videos.delete);

  // Delete all Videos
  router.delete("/videos", videos.deleteAll);

  app.use('/api', router);
};
