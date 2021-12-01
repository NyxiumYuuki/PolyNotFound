const dbConfig = require("../config/mongodb.config");
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;

if(typeof process.env.NODE_ENV !== 'undefined' && process.env.NODE_ENV === 'production'){
  db.url = dbConfig.prodUrl;
} else {
  db.url = dbConfig.devUrl;
}

db.users = require("./database/users.model")(mongoose);
db.playlists = require("./database/playlists.model")(mongoose);
db.videos = require("./database/videos.model")(mongoose);
db.ads = require("./database/ads.model")(mongoose);

module.exports = db;
