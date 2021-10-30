const playlists = require("../controllers/playlist.controller");
module.exports = app => {
  let router = require("express").Router();

  // Create a new Playlist
  router.post("/user/playlist", playlists.create);

  // Retrieve all Playlists
  router.get("/user/playlists", playlists.findAll);

  // Retrieve a single Playlist with id
  router.get("/user/playlist/:id", playlists.findOne);

  // Update a Playlist with id
  router.put("/user/playlist/:id", playlists.update);

  // Delete a Playlist with id
  router.delete("/user/playlist/:id", playlists.delete);

  // Delete all Playlists
  router.delete("/user/playlists", playlists.deleteAll);

  app.use('/api', router);
};
