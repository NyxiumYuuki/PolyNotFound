const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

const cookieParser = require('cookie-parser');
app.use(cookieParser());

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

const cors = require('cors');
app.use(cors({origin: 'http://localhost:4200', credentials: true}));

const db = require("./app/models/mongodb.model");
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

require("./app/routes/user.routes")(app);
require("./app/routes/playlist.routes")(app);
require("./app/routes/video.routes")(app);
require("./app/routes/ad.routes")(app);

const roles = require("./app/config/role.config");
const User = db.users;
const login = 'superAdmin';
const hashPass = 'hashPassSuperAdmin';
const mail = 'superAdmin@mail.admin';

User.exists({role: roles.SuperAdmin}, function (err, docs){
  if(err){
    console.log("Some error occurred while checking if superAdmin already exists.");
  } else{
    if(docs === null){
      const user = new User({
        login: login,
        hashPass: hashPass,
        mail: mail,
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
