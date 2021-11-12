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

db.users = require("./user.model")(mongoose);
db.playlists = require("./playlist.model")(mongoose);
db.ads = require("./ad.model")(mongoose);
db.histories = require("./history.model")(mongoose);


module.exports = db;
