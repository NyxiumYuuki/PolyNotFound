const playlists = require("../controllers/playlist.controller");
module.exports = app => {
  let router = require("express").Router();

  // Create a new PlaylistDB
  router.post("/playlist/create", playlists.create);

  // Retrieve all Playlists
  router.get("/playlist/findAll", playlists.findAll);

  // Retrieve a single PlaylistDB with id
  router.get("/playlist/findOne/:id", playlists.findOne);

  // Update a PlaylistDB with id
  router.put("/playlist/update/:id", playlists.update);

  // Delete a PlaylistDB with id
  router.delete("/playlist/delete/:id", playlists.delete);

  // Delete all Playlists
  router.delete("/playlist/deleteAll", playlists.deleteAll);

  app.use('/api', router);
};
