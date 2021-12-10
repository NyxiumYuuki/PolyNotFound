const db = require("../models/mongodb.model");
const {sendError, sendMessage} = require ("../config/response.config");
const {checkLogin} = require("../config/sessionJWT.config");
const ObjectId = require('mongoose').Types.ObjectId;
const roles = require("../models/objects/role.model");
const Ad = db.ads;

// Create a new Ad
exports.create = (req, res) => {
  const token = checkLogin(req, res, roles.Advertiser);
  if(token && req.body.title){
    Ad.exists({title: req.body.title}, function (err, docs){
      if(err){
        sendError(res, 500,100,err.message || "Some error occurred while checking if the Ad already exists.", token);
      } else{
        if(docs === null) {
          let ad;

          ad = new Ad({
            userId: token.id,
            title: req.body.title,
            images: req.body.images ? req.body.images : undefined,
            url: req.body.url ? req.body.url : undefined,
            interests: req.body.interests ? req.body.interests : undefined,
            comment: req.body.comment ? req.body.comment : undefined,
            isVisible: req.body.isVisible ? req.body.isVisible : undefined,
            isActive: req.body.isActive ? req.body.isActive : undefined
          });

          // Save User in the database
          ad
            .save(ad)
            .then(data => {
              return sendMessage(res, 41, data, token)
            })
            .catch(err => {
              return sendError(res, 500,100,err.message || "Some error occurred while creating the Ad.", token);
            });
        } else{
          return sendError(res, 500, 104, err || `Ad ${req.body.title} already exists.`, token);
        }
      }
    });
  }
};

// Retrieve all Ad from id if admin or session id
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
