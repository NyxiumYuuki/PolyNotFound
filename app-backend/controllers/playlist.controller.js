const db = require("../models/mongodb.model");
const {sendError, sendMessage} = require ("../config/response.config");
const {checkLogin} = require("../config/sessionJWT.config");
const {youtube, dailymotion} = require("../config/host.config");
const {asyncRequest} = require("../config/functions.config");
const ObjectId = require('mongoose').Types.ObjectId;
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

    const userId = token.id;
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

// Find single Playlist from session id
exports.findOne = (req, res) => {
  const token = checkLogin(req, res);
  if(token && typeof req.params.id !== 'undefined') {
    const id = req.params.id;
    if(id && ObjectId.isValid(id)){
      Playlist.aggregate([
        {$match: {_id: new ObjectId(id), userId: token.id, isActive: true}},
        {$unwind: '$videoIds'},
        {$project: {
          userId: true,
          name: true,
          isActive: true,
          createdAt: true,
          updatedAt: true,
          videoIds: {$toObjectId: '$videoIds'}
        }},
        {$lookup: {
          from: 'videos',
          localField: 'videoIds',
          foreignField: '_id',
          as: 'videos'
        }},
        {$unwind: '$videos'},
        {$group: {
          _id: '$_id',
          userId: {$first: "$userId"},
          name: {$first: "$name"},
          isActive: {$first: "$isActive"},
          createdAt: {$first: "$createdAt"},
          updatedAt: {$first: "$updatedAt"},
          videos: {$push: "$videos"}
        }}
      ])
        .then(async data => {
          let yt_results = [];
          let dm_results = [];
          let yt_videoIds = "";
          let dm_videoIds = "";

          for (const i in data[0].videos) {
            if (data[0].videos[i].source === youtube.name) {
              yt_videoIds = yt_videoIds + data[0].videos[i].videoId + ",";
            } else if (data[0].videos[i].source === dailymotion.name) {
              dm_videoIds = dm_videoIds + data[0].videos[i].videoId + ",";
            }
          }
          if (yt_videoIds !== "") {
            const uri = youtube.baseAPIUrl + '/videos' + '?part=snippet&part=statistics&id=' + yt_videoIds.slice(0, -1) + '&key=' + youtube.YOUTUBE_API_KEY;
            const dataVideos = await asyncRequest(uri, {});
            if (dataVideos.response.statusCode === 200 && dataVideos.body.items.length > 0) {
              yt_results = dataVideos.body.items;
            }
          }

          if (dm_videoIds !== "") {
            const uri = dailymotion.baseAPIUrl + '/videos?ids=' + dm_videoIds.slice(0, -1) + '&fields=thumbnail_480_url%2Ctitle%2Cid';
            const data = await asyncRequest(uri, {});
            const response = data.response;
            const jsonBody = data.body;
            if (response.statusCode === 200) {
              dm_results = jsonBody.list;
            }
          }
          for (const i in data[0].videos) {
            if (data[0].videos[i].source === youtube.name) {
              const obj = yt_results.filter(obj => obj.id === data[0].videos[i].videoId);
              data[0].videos[i].imageUrl = obj[0].snippet.thumbnails.medium.url ? obj[0].snippet.thumbnails.medium.url : null;
              data[0].videos[i].title = obj[0].snippet.title ? obj[0].snippet.title : null;
            } else if (data[0].videos[i].source === dailymotion.name) {
              const obj = dm_results.filter(obj => obj.id === data[0].videos[i].videoId);
              data[0].videos[i].imageUrl = obj[0].thumbnail_480_url ? obj[0].thumbnail_480_url : null;
              data[0].videos[i].title = obj[0].title ? obj[0].title : null;
            }
          }
          return sendMessage(res, 12, data[0], token)
        })
        .catch(err => {
          return sendError(res,500,100,err.message || `Some error occurred while finding the Playlist with id=${id}`, token);
        });
    } else {
      return sendError(res, 500, -1, `Error id is not valid`, token);
    }
  } else {
    return sendError(res, 500, -1, `No id given`, token);
  }
};

// Update a Playlist with playlist id
exports.update = (req, res) => {
  const token = checkLogin(req, res);
  if(token && typeof req.params.id !== 'undefined') {
    const id = req.params.id;
    if(typeof req.body._id !== 'undefined' || typeof req.body.id !== 'undefined'){
      return sendError(res, 500, -1, `User do not have the permission to modify id or _id`, token);
    } else{
      let update = {};
      let condition;

      const name = req.body.name;
      condition = name ? name : undefined;
      update.name = condition;

      const videoIds = req.body.videoIds;
      if(typeof videoIds !== 'undefined' && videoIds !== null){
        condition = videoIds ? {videoIds: videoIds} : undefined;
      } else {
        condition = undefined;
      }
      update.$addToSet = condition;

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
        Playlist.findOneAndUpdate({_id: id, userId: token.id}, update, {new: false})
          .then(data => {
            if(data) {
              if(!data.videoIds.includes(videoIds)){
                return sendMessage(res, 24, update, token);
              } else {
                return sendError(res, 500, -1, `Video in Playlist ${data.name} already exists.`, token);
              }
            } else {
              return sendError(res, 404, -1, `Playlist not found with id=${id}`, token);
            }
          })
          .catch(err => {
            return sendError(res, 500, -1, err.message || `Some error occurred while updating the Playlist with id=${id}`, token);
          });
      } else {
        return sendError(res, 500, -1, `Error id is not valid`, token);
      }
    }
  } else {
    return sendError(res, 500, -1, `No id given`, token);
  }
};

// Delete a Playlist with playlist id
exports.delete = (req, res) => {
  const token = checkLogin(req, res);
  if(token && typeof req.params.id !== 'undefined') {
    const id =  req.params.id;
    if(id && ObjectId.isValid(id)){
      Playlist.findByIdAndUpdate(id, {isActive: false}, {useFindAndModify: false})
        .then(data => {
          if(data) {
            return sendMessage(res, 25, {message: `Playlist ${id} was successfully deleted.`}, token);
          } else {
            return sendError(res, 404, 105, `Playlist not found with id=${id}`, token);
          }
        })
        .catch(err => {
          return sendError(res, 500, 100, err.message || `Some error occurred while deleting the Playlist with id=${id}`, token);
        });
    } else {
      return sendError(res, 500, -1, `Error id is not valid`, token);
    }
  } else {
    return sendError(res, 500, -1, `No id given`, token);
  }
};

// Delete all Playlists from session id
exports.deleteAll = (req, res) => {
  const token = checkLogin(req, res);
  if(token) {
    Playlist.updateMany({userId: {$eq: token.id}, isActive: true}, {isActive: false})
      .then(data => {
        return sendMessage(res, 26, {
          message: `${data.modifiedCount} Playlists were deleted successfully.`
        });
      })
      .catch(err => {
        return sendError(res, 500, -1, err.message || "Some error occurred while removing all Playlists.");
      });
  }
};
