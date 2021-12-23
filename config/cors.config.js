const cors = require('cors');
module.exports.cors = cors;

const allowList = [
    'http://127.0.0.1:4200',
    'http://127.0.0.1:4201',
    'https://admin-polynotfound.herokuapp.com/',
    'https://polynotfound.herokuapp.com/'
];

const corsOptionsDelegate = function(req, callback) {
    let corsOptions;
    if (allowList.indexOf(req.header('Origin')) !== -1) {
        corsOptions = {
            origin: true,
            credentials: true
        }
    } else {
        corsOptions = {
            origin: false,
            credentials: true
        }
    }
    callback(null, corsOptions)
}
module.exports.options = corsOptionsDelegate;