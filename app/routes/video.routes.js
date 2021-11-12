const videos = require("../controllers/video.controller");
module.exports = app => {
  let router = require("express").Router();

  router.post("/video/search", videos.search);

  router.post("/video/history", videos.history);

  router.post("/video/create", videos.create);

  router.get("/video/findAll", videos.findAll);

  router.get("/video/findOne/:id", videos.findOne);

  router.put("/video/update/:id", videos.update);

  router.delete("/video/delete/:id", videos.delete);

  router.delete("/video/deleteAll", videos.deleteAll);

  app.use('/api', router);
};
