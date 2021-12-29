const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

const cors = require('cors');

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", 'https://admin-polynotfound.herokuapp.com');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  next();
});

app.use(cors({
  origin: 'https://admin-polynotfound.herokuapp.com',
  credentials: true
}));

const cookieParser = require('cookie-parser');
app.use(cookieParser());

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

const db = require("./models/mongodb.model");
console.log("Db Url: ",db.url);
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }, function (err){
    const admin = new db.mongoose.mongo.Admin(db.mongoose.connection.db);
    admin.buildInfo(function (err, info) {
      console.log("MongoDB Version: "+info.version);
    });
    if(err){
      console.log("Cannot connect to the database!", err);
      process.exit();
    } else{
      console.log("Connected to the database!", db.url);
    }
  });

require("./routes/user.routes")(app);
require("./routes/playlist.routes")(app);
require("./routes/video.routes")(app);
require("./routes/ad.routes")(app);
require("./routes/misc.routes")(app);

const roles = require("./models/objects/role.model");
const User = db.users;
const login = 'superAdmin';
const hashPass = 'hashPassSuperAdmin';
const mail = 'superAdmin@email.admin';

User.exists({role: roles.SuperAdmin}, function (err, docs){
  if(err){
    console.log("Some error occurred while checking if superAdmin already exists.");
  } else{
    if(docs === null){
      const user = new User({
        login: login,
        hashPass: hashPass,
        email: mail,
        role: roles.SuperAdmin
      });
      user
        .save(user)
        .then(data => {
          data.hashPass = undefined; // Hiding hashPass on return
          console.log(data);
        })
        .catch(err => {
          console.log(err.message || "Some error occurred while creating superAdmin.");
        });
    } else {
      console.log("superAdmin already exist !");
    }
  }
});

app.listen(port, '0.0.0.0',() => {
  console.log (`listening on port ${port}`);
});
