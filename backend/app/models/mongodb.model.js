const dbConfig = require("../config/mongodb.config");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.users = require("./user.model")(mongoose);
db.playlists = require("./playlist.model")(mongoose);
db.ads = require("./ad.model")(mongoose);
db.histories = require("./history.model")(mongoose);


module.exports = db;
