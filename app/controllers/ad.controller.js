const db = require("../models/mongodb.model");
const {sendError, sendMessage} = require ("../config/response.config");
const {checkLogin} = require("../config/sessionJWT.config");
const roles = require("../config/role.config");
const Ads = db.ads;

// Create a new Ad
exports.create = (req, res) => {
  const token = checkLogin(req, res, [roles.Admin, roles.Advertiser]);
  if(token){
    return sendError(res, 501, -1, "Ads.create not Implemented", token);
  }
};

// Retrieve all Ads
exports.findAll = (req, res) => {
  const token = checkLogin(req, res);
  if(token){
    return sendError(res, 501, -1, "Ads.findAll not Implemented", token);
  }
};

// Retrieve a single Ad with id
exports.findOne = (req, res) => {
  const token = checkLogin(req, res);
  if(token){
    return sendError(res, 501, -1, "Ads.findOne not Implemented", token);
  }
};

// Update a Ad with id
exports.update = (req, res) => {
  const token = checkLogin(req, res, [roles.Admin, roles.Advertiser]);
  if(token){
    return sendError(res, 501, -1, "Ads.update not Implemented", token);
  }
};

// Delete a Ad with id
exports.delete = (req, res) => {
  const token = checkLogin(req, res, [roles.Admin, roles.Advertiser]);
  if(token){
    return sendError(res, 501, -1, "Ads.delete not Implemented", token);
  }
};

// Delete all Ads
exports.deleteAll = (req, res) => {
  const token = checkLogin(req, res, [roles.Admin, roles.Advertiser]);
  if(token){
    return sendError(res, 501, -1, "Ads.deleteAll not Implemented", token);
  }
};
