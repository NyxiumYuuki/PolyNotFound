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

require("./app/config/sessionJWT.config");
require("./app/routes/tutorial.routes")(app);
require("./app/routes/user.routes")(app);

app.listen(port, '0.0.0.0',() => {
  console.log (`listening on port ${port}`);
});
