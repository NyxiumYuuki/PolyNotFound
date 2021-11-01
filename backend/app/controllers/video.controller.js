const db = require("../models/mongodb.model");
const {sendError, sendMessage} = require ("../config/response.config");
const {checkLogin} = require("../config/sessionJWT.config");
const Video = db.video;

// Search Video + ads
exports.search = (req, res) => {
  const token = checkLogin(req, res);
  if(token){
    return sendError(res, 501, -1, "Video.search not Implemented", token);
  }
};

// History
exports.search = (req, res) => {
  const token = checkLogin(req, res);
  if(token){
    return sendError(res, 501, -1, "Video.search not Implemented", token);
  }
};

// Create a new Video
exports.create = (req, res) => {
  const token = checkLogin(req, res);
  if(token){
    return sendError(res, 501, -1, "Video.create not Implemented", token);
  }
};

// Retrieve all Videos + ads
exports.findAll = (req, res) => {
  const token = checkLogin(req, res);
  if(token){
    return sendError(res, 501, -1, "Video.findAll not Implemented", token);
  }
};

// Retrieve a single Video with id
exports.findOne = (req, res) => {
  const token = checkLogin(req, res);
  if(token){
    return sendError(res, 501, -1, "Video.findOne not Implemented", token);
  }
};

// Update a Video with id
exports.update = (req, res) => {
  const token = checkLogin(req, res);
  if(token){
    return sendError(res, 501, -1, "Video.update not Implemented", token);
  }
};

// Delete a Video with id
exports.delete = (req, res) => {
  const token = checkLogin(req, res);
  if(token){
    return sendError(res, 501, -1, "Video.delete not Implemented", token);
  }
};

// Delete all Videos
exports.deleteAll = (req, res) => {
  const token = checkLogin(req, res);
  if(token){
    return sendError(res, 501, -1, "Video.deleteAll not Implemented", token);
  }
};
