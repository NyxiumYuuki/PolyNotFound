const db = require("../models/mongodb.model");
const {sendError, sendMessage} = require ("../config/response.config");
const {checkLogin} = require("../config/sessionJWT.config");
const Playlist = db.playlists;

// Create a new Playlist
exports.create = (req, res) => {
  const token = checkLogin(req, res);
  if(token && req.body.name){
    Playlist.exists({name: req.body.name}, function (err, docs){
      if(err){
        sendError(res, 500,100,err.message || "Some error occurred while checking if the Playlist already exists.", token);
      } else{
        if(docs === null) {
          let playlist;

          playlist = new Playlist({
            userId: token.id,
            name: req.body.name,
            videoIds: req.body.videoIds ? req.body.videoIds : undefined,
            isActive: req.body.isActive ? req.body.isActive : undefined
          });

          // Save User in the database
          playlist
            .save(playlist)
            .then(data => {
              return sendMessage(res, 21, data, token)
            })
            .catch(err => {
              return sendError(res, 500,100,err.message || "Some error occurred while creating the Playlist.", token);
            });
        } else{
          return sendError(res, 500, 104, err || `Playlist ${req.body.name} already exists.`, token);
        }
      }
    });
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
