const {sendMessage} = require ("../config/response.config");
const interests = require("../config/video.categories.config");

// Get all interests available
exports.getInterests = (req, res) => {
  return sendMessage(res, 51, interests, null)
};
