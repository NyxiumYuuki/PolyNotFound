const db = require("../models/mongodb.model");
const request = require('request');
const {sendError, sendMessage} = require ("../config/response.config");
const {checkLogin} = require("../config/sessionJWT.config");
const {youtube, dailymotion} = require("../config/host.config");
const {asyncRequest, asyncInterest} = require("../config/functions.config");
const ObjectId = require('mongoose').Types.ObjectId;
const Video = db.videos;


// Search Videos
exports.search = async (req, res) => {
  const token = checkLogin(req, res);
  if(token && typeof req.query.q !== 'undefined'){
    const query = req.query.q;
    const maxResults = req.query.maxResults ? req.query.maxResults : 45;
    const pageToken = req.query.pageToken ? req.query.pageToken : undefined;
    let sources;
    if(typeof req.query.sources !== 'undefined' && req.query.sources !== ''){
      sources = req.query.sources.split(',');
    } else {
      sources = ["yt", "dm"];
    }
    let yt_results = [];
    let dm_results = [];
    for(const i in sources){
      if(sources[i] === youtube.shortname){
        if(youtube.YOUTUBE_API_KEY !== 'undefined' && youtube.YOUTUBE_API_KEY !== ''){
          let uri;
          if(query !== ''){
            if(typeof pageToken !== 'undefined'){
              uri = youtube.baseAPIUrl+'/search'+'?part=snippet&maxResults='+maxResults+'&q='+query+'&pageToken='+pageToken+'&key='+youtube.YOUTUBE_API_KEY;
            } else{
              uri = youtube.baseAPIUrl+'/search'+'?part=snippet&maxResults='+maxResults+'&q='+query+'&key='+youtube.YOUTUBE_API_KEY;
            }
            const dataIds = await asyncRequest(uri, {});
            if(dataIds.response.statusCode === 200 && dataIds.body.items.length > 0){
              let yt_videoIds = "";
              dataIds.body.items.forEach(item => yt_videoIds = yt_videoIds+item.id.videoId+",");
              uri = youtube.baseAPIUrl+'/videos'+'?part=snippet&part=statistics&id='+yt_videoIds.slice(0, -1)+'&key='+youtube.YOUTUBE_API_KEY;
              const dataVideos = await asyncRequest(uri, {});
              if(dataVideos.response.statusCode === 200 && dataVideos.body.items.length > 0){
                yt_results = dataVideos.body.items;
              }
            }
          } else {
            uri = youtube.baseAPIUrl+'/videos'+'?part=snippet&part=statistics&chart=mostPopular&maxResults='+maxResults+'&key='+youtube.YOUTUBE_API_KEY;
            const dataVideos = await asyncRequest(uri, {});
            if(dataVideos.response.statusCode === 200 && dataVideos.body.items.length > 0){
              yt_results = dataVideos.body.items;
            }
          }
        } else{
          return sendError(res, 500, -1, `Error Env Variable DAILYMOTION_API_KEY missing, please contact the admin.`, token);
        }
      } else if(sources[i] === dailymotion.shortname){
        if(dailymotion.DAILYMOTION_API_KEY !== 'undefined' && dailymotion.DAILYMOTION_API_KEY !== '') {
          let uri;
          if(query !== ''){
            uri = dailymotion.baseAPIUrl + '/videos?limit='+maxResults+'&search='+query+'&fields=created_time%2Cdescription%2Cthumbnail_480_url%2Clikes_total%2Ctitle%2Cid%2Cembed_url%2Cviews_total%2Cowner.username%2Cowner.id%2Cchannel.name';
          } else {
            uri = dailymotion.baseAPIUrl + '/videos?limit='+maxResults+'&sort=trending&fields=created_time%2Cdescription%2Cthumbnail_480_url%2Clikes_total%2Ctitle%2Cid%2Cembed_url%2Cviews_total%2Cowner.username%2Cowner.id%2Cchannel.name';
          }
          const data = await asyncRequest(uri, {});
          const response = data.response;
          const jsonBody = data.body;
          if(response.statusCode === 200){
            dm_results = jsonBody.list;
          }
        } else{
          return sendError(res, 500, -1, `Error Env Variable DAILYMOTION_API_KEY missing, please contact the admin.`, token);
        }
      }
    }

    let results = [];
    for(let i = 0; i < Math.max(dm_results.length, yt_results.length); i++){

      // Youtube
      if(yt_results.length > i){
        const yt_data = {
          videoId: yt_results[i].id,
          source: youtube.name,
          imageUrl: yt_results[i].snippet.thumbnails.medium.url ? yt_results[i].snippet.thumbnails.medium.url : null,
          title: yt_results[i].snippet.title  ?  yt_results[i].snippet.title : null,
          channelTitle: yt_results[i].snippet.channelTitle  ?  yt_results[i].snippet.channelTitle : null,
          channelUrl: youtube.baseChannelUrl+yt_results[i].snippet.channelId  ?  yt_results[i].snippet.channelId : null,
          description: yt_results[i].snippet.description  ?  yt_results[i].snippet.description : null,
          embedUrl: 'https://www.youtube.com/embed/'+yt_results[i].id,
          interest: await asyncInterest(yt_results[i].snippet.categoryId, youtube.name),
          views: yt_results[i].statistics.viewCount  ? parseInt(yt_results[i].statistics.viewCount) : null,
          likes: yt_results[i].statistics.likeCount  ?  parseInt(yt_results[i].statistics.likeCount) : null,
          dislikes: yt_results[i].statistics.dislikeCount  ?  parseInt(yt_results[i].statistics.dislikeCount) : null,
          publishedAt: yt_results[i].snippet.publishedAt  ?  yt_results[i].snippet.publishedAt : null
        };
        results.push(yt_data);
      }

      // Dailymotion
      if(dm_results.length > i) {
        const channelTitle = dm_results[i]['owner.username'] ? dm_results[i]['owner.username'] : null;
        const dm_data = {
          videoId: dm_results[i].id ? dm_results[i].id : null,
          source: dailymotion.name,
          imageUrl: dm_results[i].thumbnail_480_url ? dm_results[i].thumbnail_480_url : null,
          title: dm_results[i].title ? dm_results[i].title : null,
          channelTitle: channelTitle.charAt(0).toUpperCase() + channelTitle.slice(1),
          channelUrl: dailymotion.baseChannelUrl + channelTitle,
          description: dm_results[i].description ? dm_results[i].description : null,
          embedUrl: dm_results[i].embed_url ? dm_results[i].embed_url : null,
          interest: await asyncInterest(dm_results[i]['channel.name'], dailymotion.name),
          views: dm_results[i].views_total ? parseInt(dm_results[i].views_total) : null,
          likes: dm_results[i].likes_total ? parseInt(dm_results[i].likes_total) : null,
          dislikes: null,
          publishedAt: dm_results[i].created_time ? new Date(dm_results[i].created_time * 1000) : null
        };
        results.push(dm_data);
      }
    }
    return sendMessage(res, 31, results, token);
  } else{
    return sendError(res, 500, -1, `No q given`, token);
  }
};

// Get Video with id of source
exports.get =  (req, res) => {
  if(typeof req.query.source !== 'undefined' && typeof req.params.id !== 'undefined'){
    const source = req.query.source;
    const id = req.params.id;
    if(source === youtube.shortname){
      if(youtube.YOUTUBE_API_KEY !== 'undefined' && youtube.YOUTUBE_API_KEY !== ''){
        const uri = youtube.baseAPIUrl+'/videos'+'?part=snippet&part=statistics&id='+id+'&key='+youtube.YOUTUBE_API_KEY;
        request(uri,{},async function (error, response, body){
          if(typeof body !== 'undefined'){
            const jsonBody = JSON.parse(body);
            if(jsonBody.items.length !== 0 &&
              typeof jsonBody.items[0] !== 'undefined' &&
              typeof jsonBody.items[0].id !== 'undefined' &&
              jsonBody.items[0].id === id){
              const imageUrl = jsonBody.items[0].snippet.thumbnails.standard.url ? jsonBody.items[0].snippet.thumbnails.standard.url : null;
              const title = jsonBody.items[0].snippet.title  ?  jsonBody.items[0].snippet.title : null;
              const channelId = jsonBody.items[0].snippet.channelId  ?  jsonBody.items[0].snippet.channelId : null;
              const channelTitle = jsonBody.items[0].snippet.channelTitle  ?  jsonBody.items[0].snippet.channelTitle : null;
              const description = jsonBody.items[0].snippet.description  ?  jsonBody.items[0].snippet.description : null;
              //const embedUrl = jsonBody.embed_url  ?  jsonBody.embed_url : null;
              const publishedAt = jsonBody.items[0].snippet.publishedAt  ?  jsonBody.items[0].snippet.publishedAt : null;
              const interest = jsonBody.items[0].snippet.categoryId  ? await asyncInterest(jsonBody.items[0].snippet.categoryId, youtube.name): null;
              const views = jsonBody.items[0].statistics.viewCount  ?  parseInt(jsonBody.items[0].statistics.viewCount) : null;
              const likes = jsonBody.items[0].statistics.likeCount  ?  parseInt(jsonBody.items[0].statistics.likeCount) : null;
              const dislikes = jsonBody.items[0].statistics.dislikeCount  ?  parseInt(jsonBody.items[0].statistics.dislikeCount) : null;
              const data = {
                videoId: id,
                source: youtube.name,
                imageUrl: imageUrl,
                title: title,
                channelTitle: channelTitle,
                channelUrl: youtube.baseChannelUrl+channelId,
                description: description,
                embedUrl: 'https://www.youtube.com/embed/'+id,
                interest: interest,
                views: views,
                likes: likes,
                dislikes: dislikes,
                publishedAt: publishedAt
              };
              return sendMessage(res, 32, data);
            } else{
              return sendError(res, 404, -1, `No result`);
            }
          } else{
            return sendError(res, 500, -1, error);
          }
        });
      } else{
        return sendError(res, 500, -1, `Error Env Variable YOUTUBE_API_KEY missing, please contact the admin.`);
      }
    } else if(source === dailymotion.shortname){
      if(dailymotion.DAILYMOTION_API_KEY !== 'undefined' && dailymotion.DAILYMOTION_API_KEY !== ''){
        const uri = dailymotion.baseAPIUrl+'/video/'+id+'?fields=created_time%2Cdescription%2Cthumbnail_480_url%2Clikes_total%2Ctitle%2Cid%2Cembed_url%2Cviews_total%2Cowner.username%2Cowner.id%2Cchannel.name';
        request(uri,{},async function (error, response, body) {
          if (typeof body !== 'undefined') {
            const jsonBody = JSON.parse(body);
            if(response.statusCode === 200 &&
              typeof jsonBody.id !== 'undefined' &&
              jsonBody.id === id){
              const imageUrl = jsonBody.thumbnail_480_url ? jsonBody.thumbnail_480_url : null;
              const title = jsonBody.title  ?  jsonBody.title : null;
              //const channelId = jsonBody['owner.id']  ?  jsonBody['owner.id'] : null;
              const channelTitle = jsonBody['owner.username']  ?  jsonBody['owner.username'] : null;
              const description = jsonBody.description  ?  jsonBody.description : null;
              const embedUrl = jsonBody.embed_url  ?  jsonBody.embed_url : null;
              const publishedAt = jsonBody.created_time  ?  new Date(jsonBody.created_time * 1000) : null;
              const interest = jsonBody['channel.name']  ? await asyncInterest(jsonBody['channel.name'], dailymotion.name) : null;
              const views = jsonBody.views_total  ?  parseInt(jsonBody.views_total) : null;
              const likes = jsonBody.likes_total ?  parseInt(jsonBody.likes_total) : null;
              const dislikes = null;
              const data = {
                videoId: id,
                source: dailymotion.name,
                imageUrl: imageUrl,
                title: title,
                channelTitle: channelTitle.charAt(0).toUpperCase() + channelTitle.slice(1),
                channelUrl: dailymotion.baseChannelUrl+channelTitle,
                description: description,
                embedUrl: embedUrl,
                interest: interest,
                views: views,
                likes: likes,
                dislikes: dislikes,
                publishedAt: publishedAt
              };
              return sendMessage(res, 32, data);
            } else{
              return sendError(res, 404, -1, jsonBody.error.message);
            }
          }
        });
      } else{
        return sendError(res, 500, -1, `Error Env Variable DAILYMOTION_API_KEY missing, please contact the admin.`);
      }
    } else{
      return sendError(res, 500, -1, `Wrong source name`);
    }
  } else{
    return sendError(res, 500, -1, `No source or/and id given`);
  }
};

// Create a new Video
exports.create = (req, res) => {
  const token = checkLogin(req, res);
  if(token &&
    typeof req.body.source !== 'undefined' &&
    typeof req.body.interest !== 'undefined' &&
    typeof req.params.id !== 'undefined'){
    const id = req.params.id;
    Video.exists({userId: token.id, videoId: id, source: req.body.source, isActive: true}, function (err, docs){
      if(err){
        sendError(res, 500,100,err.message || "Some error occurred while checking if the Video already exists.", token);
      } else{
        if(docs === null) {
          let video;

          video = new Video({
            userId: token.id,
            videoId: id,
            source: req.body.source,
            interest: req.body.interest,
            watchedDates: [new Date()]
          });

          // Save Video in the database
          video
            .save(video)
            .then(data => {
              return sendMessage(res, 33, data, token)
            })
            .catch(err => {
              return sendError(res, 500,100,err.message || "Some error occurred while creating the Video.", token);
            });
        } else{
          const id = docs._id.toString();
          Video.findByIdAndUpdate(id, {$push: {watchedDates: [new Date()]}}, {useFindAndModify: false, new: true})
            .then(data => {
              if(data) {
                return sendMessage(res, 33, data, token);
              } else {
                return sendError(res, 404, 105, `Video not found with id=${id}`, token);
              }
            })
            .catch(err => {
              return sendError(res, 500, 100, err.message || `Some error occurred while updating the Video with id=${id}`, token);
            });
        }
      }
    });
  } else {
    return sendError(res, 500, -1, `No source or interest or id given`, token);
  }
};

// Retrieve all Videos
exports.findAll = (req, res) => {
  const token = checkLogin(req, res);
  if(token){
    let query = {};
    let condition;

    const userId = req.query.userId;
    condition = userId ? userId : undefined;
    query.userId = condition;

    const videoId = req.query.videoId;
    condition = videoId ? videoId : undefined;
    query.videoId = condition;

    const source = req.query.source;
    condition = source ? source : undefined;
    query.source = condition;

    const interests = req.query.interests;
    condition = interests ? {$in: interests} : undefined;
    query["interests.interest"] = condition

    const isActive = req.query.isActive;
    condition = isActive ? isActive : undefined;
    query.isActive = condition;

    const sort = req.query.sort;
    if(sort !== 'undefined'){
      switch (sort){
        case 'asc':
          condition = {videoId: 1};
          break;
        case 'desc':
          condition = {videoId: -1};
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
          condition = {createdAt: -1};
      }
    }
    const query_sort = {sort: condition};

    // Remove undefined key
    Object.keys(query).forEach(key => query[key] === undefined ? delete query[key] : {});
    console.log(query);

    Video.find(query, {}, query_sort)
      .then(data => {
        return sendMessage(res, 34, data, token);
      })
      .catch(err => {
        return sendError(res,500,100,err.message || "Some error occurred while finding the Videos.", token);
      });
  }
};

// Find single Video with id
exports.findOne = (req, res) => {
  const token = checkLogin(req, res);
  if(token && typeof req.params.id !== 'undefined') {
    const id = req.params.id;
    if(id && ObjectId.isValid(id)){
      Video.findById(id, {})
        .then(data => {
          if(data){
            return sendMessage(res, 35, data, token);
          } else {
            return sendError(res,404,105,`Video not found with id=${id}`, token);
          }
        })
        .catch(err => {
          return sendError(res,500,100,err.message || `Some error occurred while finding the Video with id=${id}`, token);
        });
    } else {
      return sendError(res, 500, -1, `Error id is not valid`, token);
    }
  } else {
    return sendError(res, 500, -1, `No id given`, token);
  }
};

// Update Video with id
exports.update = (req, res) => {
  const token = checkLogin(req, res);
  if(token && typeof req.params.id !== 'undefined') {
    const id = req.params.id;
    if(typeof req.body._id !== 'undefined' || typeof req.body.id !== 'undefined'){
      return sendError(res, 500, -1, `User do not have the permission to modify id or _id`, token);
    } else{
      let update = {};
      let condition;

      const watchedDate = req.body.watchedDate;
      if(typeof watchedDate !== 'undefined'){
        if(watchedDate){
          condition = {watchedDates: [new Date()]}
        } else {
          condition = undefined;
        }
      } else{
        condition = undefined;
      }
      update.$push = condition;

      const watchedDates = req.body.watchedDates ? req.body.watchedDates : undefined;
      update.watchedDates = watchedDates;

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
        Video.updateOne({_id: id, userId: token.id, isActive: true}, update)
          .then(data => {
            if(data) {
              return sendMessage(res, 36, update, token);
            } else {
              return sendError(res, 404, -1, `Video not found with id=${id}`, token);
            }
          })
          .catch(err => {
            return sendError(res, 500, -1, err.message || `Some error occurred while updating the Video with id=${id}`, token);
          });
      } else {
        return sendError(res, 500, -1, `Error id is not valid`, token);
      }
    }
  } else {
    return sendError(res, 500, -1, `No id given`, token);
  }
};

// Delete Video with id
exports.delete = (req, res) => {
  const token = checkLogin(req, res);
  if(token && typeof req.params.id !== 'undefined') {
    const id =  req.params.id;
    if(id && ObjectId.isValid(id)){
      Video.updateOne({_id: id, userId: token.id, isActive: true}, {isActive: false}, {useFindAndModify: false})
        .then(data => {
          if(data.modifiedCount > 0) {
            return sendMessage(res, 37, {message: `Video ${id} was successfully deleted.`}, token);
          } else {
            return sendError(res, 404, 105, `Video not found with id=${id}`, token);
          }
        })
        .catch(err => {
          return sendError(res, 500, 100, err.message || `Some error occurred while deleting the Video with id=${id}`, token);
        });
    } else {
      return sendError(res, 500, -1, `Error id is not valid`, token);
    }
  } else {
    return sendError(res, 500, -1, `No id given`, token);
  }
};

// Delete all Videos
exports.deleteAll = (req, res) => {
  const token = checkLogin(req, res);
  if(token) {
    Video.updateMany({userId: {$eq: token.id}, isActive: true}, {isActive: false})
      .then(data => {
        return sendMessage(res, 38, {
          message: `${data.modifiedCount} Videos were deleted successfully.`,
        });
      })
      .catch(err => {
        return sendError(res, 500, 100, err.message || "Some error occurred while removing all Videos.");
      });
  }
};
