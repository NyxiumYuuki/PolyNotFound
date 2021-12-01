const playlists = require("../controllers/playlist.controller");
module.exports = app => {
  let router = require("express").Router();

  // Create a new Playlist
  router.post("/playlist/create", playlists.create);

  // Retrieve all Playlist from id if admin or session id
  router.get("/playlist/findAll", playlists.findAll);

  // Find single Playlist from id if admin or session id
  router.get("/playlist/findOne/:id", playlists.findOne);

  // Update a Playlist with playlist id
  router.put("/playlist/update/:id", playlists.update);

  // Delete a Playlist with playlist id
  router.delete("/playlist/delete/:id", playlists.delete);

  // Delete all Playlists from id if admin or session id
  router.delete("/playlist/deleteAll", playlists.deleteAll);

  app.use('/api', router);
};
