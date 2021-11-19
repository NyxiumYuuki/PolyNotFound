const db = require("../models/mongodb.model");
const {sendError, sendMessage} = require ("../config/response.config");
const {checkLogin} = require("../config/sessionJWT.config");
const Video = db.video;

// Search VideoDB
exports.search = (req, res) => {
  const token = checkLogin(req, res);
  if(token){
    return sendError(res, 501, -1, "VideoDB.search not Implemented", token);
  }
};

// History
exports.history = (req, res) => {
  const token = checkLogin(req, res);
  if(token){
    return sendError(res, 501, -1, "VideoDB.search not Implemented", token);
  }
};

// Create a new VideoDB
exports.create = (req, res) => {
  const token = checkLogin(req, res);
  if(token){
    return sendError(res, 501, -1, "VideoDB.create not Implemented", token);
  }
};

// Retrieve all Videos
exports.findAll = (req, res) => {
  const token = checkLogin(req, res);
  if(token){
    return sendError(res, 501, -1, "VideoDB.findAll not Implemented", token);
  }
};

// Retrieve a single VideoDB with id
exports.findOne = (req, res) => {
  const token = checkLogin(req, res);
  if(token){
    return sendError(res, 501, -1, "VideoDB.findOne not Implemented", token);
  }
};

// Update a VideoDB with id
exports.update = (req, res) => {
  const token = checkLogin(req, res);
  if(token){
    return sendError(res, 501, -1, "VideoDB.update not Implemented", token);
  }
};

// Delete a VideoDB with id
exports.delete = (req, res) => {
  const token = checkLogin(req, res);
  if(token){
    return sendError(res, 501, -1, "VideoDB.delete not Implemented", token);
  }
};

// Delete all Videos
exports.deleteAll = (req, res) => {
  const token = checkLogin(req, res);
  if(token){
    return sendError(res, 501, -1, "VideoDB.deleteAll not Implemented", token);
  }
};
