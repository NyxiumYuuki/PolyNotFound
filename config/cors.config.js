const cors = require('cors');
module.exports.cors = cors;

const whitelist = [
    'http://127.0.0.1:4200',
    'http://127.0.0.1:4201',
    'https://admin-polynotfound.herokuapp.com',
    'https://polynotfound.herokuapp.com'
];

module.exports.corsOptions = {
    origin: function(origin, callback) {
        console.log(whitelist, origin);
        if (whitelist.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    }
}