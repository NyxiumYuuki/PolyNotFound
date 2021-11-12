const playlists = require("../controllers/playlist.controller");
module.exports = app => {
  let router = require("express").Router();

  // Create a new Playlist
  router.post("/playlist/create", playlists.create);

  // Retrieve all Playlists
  router.get("/playlist/findAll", playlists.findAll);

  // Retrieve a single Playlist with id
  router.get("/playlist/findOne/:id", playlists.findOne);

  // Update a Playlist with id
  router.put("/playlist/update/:id", playlists.update);

  // Delete a Playlist with id
  router.delete("/playlist/delete/:id", playlists.delete);

  // Delete all Playlists
  router.delete("/playlist/deleteAll", playlists.deleteAll);

  app.use('/api', router);
};
