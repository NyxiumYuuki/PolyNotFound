const db = require("../models/mongodb.model");
const {sendError, sendMessage} = require ("../config/response.config");
const {checkLogin} = require("../config/sessionJWT.config");
const Playlist = db.playlists;

// Create a new Playlist
exports.create = (req, res) => {
  const token = checkLogin(req, res);
  if(token){
    return sendError(res, 501, -1, "Playlist.create not Implemented", token);
  }
};

// Retrieve all Playlist from id if admin or session id
exports.findAll = (req, res) => {
  const token = checkLogin(req, res);
  if(token){
    return sendError(res, 501, -1, "Playlist.findAll not Implemented", token);
  }
};

// Find single Playlist from id if admin or session id
exports.findOne = (req, res) => {
  const token = checkLogin(req, res);
  if(token){
    return sendError(res, 501, -1, "Playlist.findOne not Implemented", token);
  }
};

// Update a Playlist with playlist id
exports.update = (req, res) => {
  const token = checkLogin(req, res);
  if(token){
    return sendError(res, 501, -1, "Playlist.update not Implemented", token);
  }
};

// Delete a Playlist with playlist id
exports.delete = (req, res) => {
  const token = checkLogin(req, res);
  if(token){
    return sendError(res, 501, -1, "Playlist.delete not Implemented", token);
  }
};

// Delete all Playlists from id if admin or session id
exports.deleteAll = (req, res) => {
  const token = checkLogin(req, res);
  if(token){
    return sendError(res, 501, -1, "Playlist.deleteAll not Implemented", token);
  }
};
