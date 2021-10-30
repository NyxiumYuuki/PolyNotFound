const dbConfig = require("../config/mongodb.config");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.users = require("./user.model")(mongoose);
db.playlists = require("./playlist.model")(mongoose);
db.videos = require("./video.model")(mongoose);
db.ads = require("./ad.model")(mongoose);
db.images = require("./image.model")(mongoose);

module.exports = db;
