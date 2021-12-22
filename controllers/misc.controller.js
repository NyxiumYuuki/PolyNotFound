const {sendMessage} = require ("../config/response.config");
const interests = require("../models/objects/video.categories.model");

// Get all interests available
exports.getInterests = (req, res) => {
  return sendMessage(res, 51, interests, null)
};
