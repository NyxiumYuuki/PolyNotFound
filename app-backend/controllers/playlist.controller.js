const db = require("../models/mongodb.model");
const {sendError, sendMessage} = require ("../config/response.config");
const {checkLogin} = require("../config/sessionJWT.config");
const Playlist = db.playlists;

// Create a new PlaylistDB
exports.create = (req, res) => {
  const token = checkLogin(req, res);
  if(token){
    return sendError(res, 501, -1, "PlaylistDB.create not Implemented", token);
  }
};

// Retrieve all Playlists
exports.findAll = (req, res) => {
  const token = checkLogin(req, res);
  if(token){
    return sendError(res, 501, -1, "PlaylistDB.findAll not Implemented", token);
  }
};

// Retrieve a single PlaylistDB with id
exports.findOne = (req, res) => {
  const token = checkLogin(req, res);
  if(token){
    return sendError(res, 501, -1, "PlaylistDB.findOne not Implemented", token);
  }
};

// Update a PlaylistDB with id
exports.update = (req, res) => {
  const token = checkLogin(req, res);
  if(token){
    return sendError(res, 501, -1, "PlaylistDB.update not Implemented", token);
  }
};

// Delete a PlaylistDB with id
exports.delete = (req, res) => {
  const token = checkLogin(req, res);
  if(token){
    return sendError(res, 501, -1, "PlaylistDB.delete not Implemented", token);
  }
};

// Delete all Playlists
exports.deleteAll = (req, res) => {
  const token = checkLogin(req, res);
  if(token){
    return sendError(res, 501, -1, "PlaylistDB.deleteAll not Implemented", token);
  }
};
