const db = require("../models/mongodb.model");
const {sendError, sendMessage} = require ("../config/response.config");
const {checkLogin} = require("../config/sessionJWT.config");
const roles = require("../models/objects/role.model");
const Ads = db.ads;

// Create a new Ad
exports.create = (req, res) => {
  const token = checkLogin(req, res, [roles.Admin, roles.Advertiser]);
  if(token){
    return sendError(res, 501, -1, "Ad.create not Implemented", token);
  }
};

// Retrieve all Ad from id if admin or session id
exports.findAll = (req, res) => {
  const token = checkLogin(req, res);
  if(token){
    return sendError(res, 501, -1, "Ad.findAll not Implemented", token);
  }
};

// Find single Ad from id if admin or session id
exports.findOne = (req, res) => {
  const token = checkLogin(req, res);
  if(token){
    return sendError(res, 501, -1, "Ad.findOne not Implemented", token);
  }
};

// Update a Ad with ad id
exports.update = (req, res) => {
  const token = checkLogin(req, res, [roles.Admin, roles.Advertiser]);
  if(token){
    return sendError(res, 501, -1, "Ad.update not Implemented", token);
  }
};

// Delete a Ad with ad id
exports.delete = (req, res) => {
  const token = checkLogin(req, res, [roles.Admin, roles.Advertiser]);
  if(token){
    return sendError(res, 501, -1, "Ad.delete not Implemented", token);
  }
};

// Delete all Ad from id if admin or session id
exports.deleteAll = (req, res) => {
  const token = checkLogin(req, res, [roles.Admin, roles.Advertiser]);
  if(token){
    return sendError(res, 501, -1, "Ad.deleteAll not Implemented", token);
  }
};
