function sendMessage (res, successCode, data, token=null) {
  res.status(200).json({ status: 'success', successCode: successCode, token: token, data: data });
}

function sendError (res, statusCode, errorCode, reason, token=null) {
  res.status(statusCode).json({ status: 'error', errorCode: errorCode, token: token, reason: reason});
}

module.exports = { sendMessage, sendError };
