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
  Ad.exists({title: req.body.title, userId: token.id, isActive: true}, function (err, docs){
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
  } else {
    return sendError(res, 500, -1, `No title given`, token);
  }
};

// Retrieve all Ad from id if admin or session id
exports.findAll = (req, res) => {
  const token = checkLogin(req, res, roles.Advertiser);
  if(token){
    let query = {};
    let condition;

    const adId = req.query.adId;
    condition = adId ? adId : undefined;
    query._id = condition;

    const userId = req.query.userId;
    condition = userId ? userId : undefined;
    query.userId = condition;

    const title = req.query.title;
    condition = title ? { $regex: new RegExp(title), $options: "i" } : undefined;
    query.title = condition;

    const url = req.query.url;
    condition = url ? { $regex: new RegExp(url), $options: "i" } : undefined;
    query.url = condition;

    const interests = req.query.interests;
    condition = interests ? {$in: interests.split(',')} : undefined;
    query["interests.interest"] = condition

    const comment = req.query.comment;
    condition = comment ? { $regex: new RegExp(comment), $options: "i" } : undefined;
    query.comment = condition;

    const isVisible = req.query.isVisible;
    condition = isVisible ? isVisible : undefined;
    query.isVisible = condition;

    const isActive = req.query.isActive;
    condition = isActive ? isActive : undefined;
    query.isActive = condition;

    const sort = req.query.sort;
    if(sort !== 'undefined'){
      switch (sort){
        case 'asc':
          condition = {title: 1};
          break;
        case 'desc':
          condition = {title: -1};
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
          condition = {title: 1};
      }
    }
    const query_sort = {sort: condition};

    // Remove undefined key
    Object.keys(query).forEach(key => query[key] === undefined ? delete query[key] : {});
    console.log(query);

    Ad.find(query, {}, query_sort)
      .then(data => {
        if(data){
          return sendMessage(res, 42, data, token);
        }
      })
      .catch(err => {
        return sendError(res,500,100,err.message || "Some error occurred while finding the Ads.", token);
      });
  }
};

// Find single Ad from id if admin or session id
exports.findOne = (req, res) => {
  const token = checkLogin(req, res, roles.Advertiser);
  if(token && typeof req.params.id !== 'undefined') {
    const id = req.params.id;
    if(id && ObjectId.isValid(id)){
      Ad.findById(id, {})
        .then(data => {
          if(data){
            return sendMessage(res, 43, data, token);
          } else {
            return sendError(res,404,105,`Ad not found with id=${id}`, token);
          }
        })
        .catch(err => {
          return sendError(res,500,100,err.message || `Some error occurred while finding the Ad with id=${id}`, token);
        });
    } else {
      return sendError(res, 500, -1, `Error id is not valid`, token);
    }
  } else {
    return sendError(res, 500, -1, `No id given`, token);
  }
};

// Update a Ad with ad id
exports.update = (req, res) => {
  const token = checkLogin(req, res, roles.Advertiser);
  if(token && typeof req.params.id !== 'undefined') {
    const id = req.params.id;
    if(typeof req.body._id !== 'undefined' || typeof req.body.id !== 'undefined'){
      return sendError(res, 500, -1, `User do not have the permission to modify id or _id`, token);
    } else{
      let update = {};
      let condition;

      const title = req.body.title;
      condition = title ? title : undefined;
      update.title = condition;

      const images = req.body.images;
      condition = images ? images : undefined;
      update.images = condition;

      const url = req.body.url;
      condition = url ? url : undefined;
      update.url = condition;

      let interests = req.body.interests;
      condition = interests ? {interests: [...new Map(interests.map(v => [v.id, v])).values()]} : undefined;
      update.$addToSet = condition;

      const comment = req.body.comment;
      condition = comment ? comment : undefined;
      update.comment = condition;

      const isVisible = req.body.isVisible;
      if(typeof isVisible !== 'undefined'){
        condition = isVisible;
      } else{
        condition = undefined;
      }
      update.isVisible = condition;

      const isActive = req.body.isActive;
      if(typeof isActive !== 'undefined'){
        condition = isActive;
      } else{
        condition = undefined;
      }
      update.isActive = condition;

      // Remove undefined key
      Object.keys(update).forEach(key => update[key] === undefined ? delete update[key] : {});

      if(id && ObjectId.isValid(id)){
        Ad.updateOne({_id: id, userId: token.id}, update)
          .then(data => {
            if(data) {
              //Object.keys(update).forEach(key => data[key] = update[key]);
              return sendMessage(res, 44, update, token);
            } else {
              return sendError(res, 404, -1, `Ad not found with id=${id}`, token);
            }
          })
          .catch(err => {
            return sendError(res, 500, -1, err.message || `Some error occurred while updating the Ad with id=${id}`, token);
          });
      } else {
        return sendError(res, 500, -1, `Error id is not valid`, token);
      }
    }
  } else {
    return sendError(res, 500, -1, `No id given`, token);
  }
};

// Delete an Ad with ad id
exports.delete = (req, res) => {
  const token = checkLogin(req, res, roles.Advertiser);
  if(token && typeof req.params.id !== 'undefined') {
    let match = null;
    const id = req.params.id;
    if(id && ObjectId.isValid(id)){
      if(typeof token.role !== 'undefined' &&
        typeof token.role.permission !== 'undefined' &&
        typeof token.role.isAccepted !== 'undefined' &&
        token.role.isAccepted === true &&
        token.role.permission >= roles.Admin.permission) {
        match =  {_id: id, isActive: true};
      } else {
        match =  {_id: id, userId: token.id, isActive: true};
      }
      Ad.findOneAndUpdate(match, {isActive: false}, {useFindAndModify: false, new: true})
        .then(data => {
          if(data) {
            if(data.isActive !== true){
              return sendMessage(res, 45, {message: `Ad ${id} was successfully deleted.`}, token);
            } else {
              return sendError(res, 404, 105, `Ad ${id} was not deleted.`, token);
            }
          } else {
            return sendError(res, 404, 105, `Ad not found with id=${id}`, token);
          }
        })
        .catch(err => {
          return sendError(res, 500, 100, err.message || `Some error occurred while deleting the Ad with id=${id}`, token);
        });
    } else {
      return sendError(res, 500, -1, `Error id is not valid`, token);
    }
  } else {
    return sendError(res, 500, -1, `No id given`, token);
  }
};

// Delete all Ad from session id
exports.deleteAll = (req, res) => {
  const token = checkLogin(req, res, roles.Advertiser);
  if(token) {
    Ad.updateMany({userId: {$eq: token.id}, isActive: true}, {isActive: false})
      .then(data => {
        return sendMessage(res, 46, {
          message: `${data.modifiedCount} Ads were deleted successfully.`
        });
      })
      .catch(err => {
        return sendError(res, 500, -1, err.message || "Some error occurred while removing all Ads.");
      });
  }
};
