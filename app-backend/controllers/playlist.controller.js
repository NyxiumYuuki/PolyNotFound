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
    let query = {};
    let condition;

    const playlistId = req.query.playlistId;
    condition = playlistId ? playlistId : undefined;
    query._id = condition;

    const userId = req.query.userId;
    condition = userId ? userId : undefined;
    query.userId = condition;

    const videoIds = req.query.videoIds;
    condition = videoIds ? {$in: videoIds} : undefined;
    query.videoIds = condition;

    const name = req.query.name;
    condition = name ? { $regex: new RegExp(name), $options: "i" } : undefined;
    query.name = condition;

    const isActive = req.query.isActive;
    condition = isActive ? isActive : undefined;
    query.isActive = condition;

    const sort = req.query.sort;
    if(sort !== 'undefined'){
      switch (sort){
        case 'asc':
          condition = {name: 1};
          break;
        case 'desc':
          condition = {name: -1};
          break;
        case 'createdAtAsc':
          condition = {createdAt: 1};
          break;
        case 'createdAtDesc':
          condition = {createdAt: -1};
          break;
        case 'updatedAtAsc':
          condition = {updatedAt: 1};
          break;
        case 'updatedAtDesc':
          condition = {updatedAt: -1};
          break;
        default:
          condition = {name: 1};
      }
    }
    const query_sort = {sort: condition};

    // Remove undefined key
    Object.keys(query).forEach(key => query[key] === undefined ? delete query[key] : {});
    console.log(query);

    Playlist.find(query, {}, query_sort)
      .then(data => {
        return sendMessage(res, 22, data, token);
      })
      .catch(err => {
        return sendError(res,500,100,err.message || "Some error occurred while finding the Playlists.", token);
      });
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
