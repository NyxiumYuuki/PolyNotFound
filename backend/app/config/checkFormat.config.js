const {sendError} = require ("./response.config");

function checkFormat(req, res){
  if(req.get('Content-Type') !== 'application/json') {
    return sendError(res, 401, -1, "Invalid header format (please use JSON)");
  }
  return true; // Is valid
}
module.exports = checkFormat
