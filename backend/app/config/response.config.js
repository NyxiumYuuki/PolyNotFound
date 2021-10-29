function sendMessage (res, successCode, data) {
  res.status(200).json({ status: 'success', successCode: successCode, data: data });
}

function sendError (res, statusCode, errorCode, reason) {
  res.status(statusCode).json({ status: 'error', errorCode: errorCode, reason: reason });
}

module.exports = { sendMessage, sendError };
