function sendMessage (res, successCode, data) {
  return res.status(200).json({ status: 'success', successCode: successCode, data: data });
}

function sendError (res, statusCode, errorCode, reason) {
  return res.status(statusCode).json({ status: 'error', errorCode: errorCode, reason: reason });
}

module.exports = { sendMessage, sendError };
