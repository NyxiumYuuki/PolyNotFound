const path = require('path');
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

const cookieParser = require('cookie-parser');
app.use(cookieParser());

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

const cors = require('cors');
app.use(cors({origin: 'http://127.0.0.1:4200', credentials: true}));

const db = require("./app-backend/models/mongodb.model");
console.log("Db Url: ",db.url);
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }, function (err){
    if(err){
      console.log("Cannot connect to the database!", err);
      process.exit();
    } else{
      console.log("Connected to the database!", db.url);
    }
  });

require("./app-backend/routes/user.routes")(app);
require("./app-backend/routes/playlist.routes")(app);
require("./app-backend/routes/video.routes")(app);
require("./app-backend/routes/ad.routes")(app);
require("./app-backend/routes/misc.routes")(app);

const roles = require("./app-backend/models/objects/role.model");
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

app.get('/*all', function(req,res) {
  res.sendFile(path.join(__dirname+ '/dist/index.html'));
});

app.use(express.static(__dirname + '/dist/frontend'));
app.get('/*', function(req,res) {
  res.sendFile(path.join(__dirname+ '/dist/frontend/index.html'));
});

app.listen(port, '0.0.0.0',() => {
  console.log (`listening on port ${port}`);
});
