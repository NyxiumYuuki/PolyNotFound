const request = require("request");
const VideoCategories = require("../models/objects/video.categories.model");

function asyncRequest(uri, option){
  return new Promise(function(resolve){
    request(uri, option,function (error, response, body){
      resolve({response: response, body: JSON.parse(body)});
    });
  });
}
module.exports.asyncRequest = asyncRequest;

function asyncInterest(interest, source){
  return new Promise(function(resolve){
    for(const i in VideoCategories){
      for(const j in VideoCategories[i].categories){
        if((VideoCategories[i].categories[j].name === interest || VideoCategories[i].categories[j].id === interest)
          && VideoCategories[i].categories[j].source === source){
          resolve(VideoCategories[i].interest);
        }
      }
    }
    resolve(null);
  });
}
module.exports.asyncInterest = asyncInterest;
