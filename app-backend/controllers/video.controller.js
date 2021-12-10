const db = require("../models/mongodb.model");
const request = require('request');
const {sendError, sendMessage} = require ("../config/response.config");
const {checkLogin} = require("../config/sessionJWT.config");
const {youtube, dailymotion} = require("../config/host.config");
const Video = db.video;

// Search Videos
exports.search = (req, res) => {
  const token = checkLogin(req, res);
  if(token){
    return sendError(res, 501, -1, "Video.search not Implemented", token);
  }
};

// Get Video with id of source
exports.get = (req, res) => {
  if(typeof req.query.source !== 'undefined' && typeof req.params.id !== 'undefined'){
    const source = req.query.source;
    const id = req.params.id;
    if(source === youtube.shortname){
      if(youtube.YOUTUBE_API_KEY !== 'undefined' && youtube.YOUTUBE_API_KEY !== ''){
        const uri = youtube.baseAPIUrl+'/videos'+'?part=snippet&part=statistics&id='+id+'&key='+youtube.YOUTUBE_API_KEY;
        request(uri,{},function (error, response, body){
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
        const uri = dailymotion.baseAPIUrl+'/video/'+id+'?fields=created_time%2Cdescription%2Cthumbnail_480_url%2Clikes_total%2Ctitle%2Cid%2Cembed_url%2Cviews_total%2Cowner.username%2Cowner.id';
        request(uri,{},function (error, response, body) {
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
  if(token){
    return sendError(res, 501, -1, "Video.create not Implemented", token);
  }
};

// Retrieve all Videos
exports.findAll = (req, res) => {
  const token = checkLogin(req, res);
  if(token){
    return sendError(res, 501, -1, "Video.findAll not Implemented", token);
  }
};

// Find single Video with id
exports.findOne = (req, res) => {
  const token = checkLogin(req, res);
  if(token){
    return sendError(res, 501, -1, "Video.findOne not Implemented", token);
  }
};

// Update Video with id
exports.update = (req, res) => {
  const token = checkLogin(req, res);
  if(token){
    return sendError(res, 501, -1, "Video.update not Implemented", token);
  }
};

// Delete Video with id
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
