const db = require("../models/mongodb.model");
const {sendError, sendMessage} = require ("../config/response.config");
const checkFormat = require("../config/checkFormat.config");
const sessionJWT = require('../config/sessionJWT.config');
const {checkLogin} = require("../config/sessionJWT.config");
const User = db.users;

// Authenticate an User
exports.auth = (req, res) => {
  checkFormat(req, res);
  // Validate request
  if (!req.body.mail || !req.body.hashPass) {
    sendError(res, 400,-1,"Content can not be empty ! (mail and hashPass needed)");
  } else{
    // Check User in the database
    User
      .findOne({mail: req.body.mail, hashPass: req.body.hashPass}, [{count: {$size: "$_id"}}])
      .then(data => {
        if (data !== null){
          sessionJWT.setSessionCookie(req, res, { mail: req.body.mail });
          return sendMessage(res, 1, true);
        } else {
          sessionJWT.setSessionCookie(req, res, { mail: -1 });
          return sendError(res, 500, -1, "Invalid mail or password.");
        }
      })
      .catch(err => {
        sendError(res, 500,-1,err.message || "Some error occurred while authenticating the User.");
      });
  }
};

// Disconnect an User
exports.disconnect = (req, res) => {
  let token;
  if(checkFormat(req, res) && (token = checkLogin(req, res))) {
    console.log(token);
    sessionJWT.setSessionCookie(req, res, {mail: -1});
    return sendMessage(res, 1, {message: "User disconnected"});
  }
};

// Create and Save a new User
exports.create = (req, res) => {
    checkFormat(req, res);
  // Validate request
  if (!req.body.login || !req.body.hashPass || !req.body.mail || !req.body.role) {
    sendError(res, 400,-1,"Content can not be empty ! (login, hashPass,  mail and role needed");
  }
  else{
    User.exists({login: req.body.login}, function (err, docs){
      if(err){
        sendError(res, 500,-1,err.message || "Some error occurred while checking if the User already exists.");
      } else{
        if(docs === null) {
          const user = new User({
            login: req.body.login,
            hashPass: req.body.hashPass,
            mail: req.body.mail,
            role: req.body.role
          });

          // Save User in the database
          user
            .save(user)
            .then(data => {
              data.hashPass = undefined; // Hiding hashPass on return
              sendMessage(res, 1, data)
            })
            .catch(err => {
              sendError(res, 500,-1,err.message || "Some error occurred while creating the User.");
            });
        } else{
          sendError(res, 500, -1, err || "User already exists.");
        }
      }
    });
  }
};

// Retrieve all Users from the database.
exports.findAll = (req, res) => {
  let token;
  if(checkFormat(req, res) && (token = checkLogin(req, res))){
    console.log(token);
    const login = req.query.login;
    let condition = login ? { login: { $regex: new RegExp(login), $options: "i" } } : {};

    User.find(condition, {hashPass: false})
      .then(data => {
        sendMessage(res, 1, data)
      })
      .catch(err => {
        sendError(res,500,-1,err.message || "Some error occurred while retrieving users.");
      });
  }
};

// Find a single User with an id
exports.findOne = (req, res) => {
  checkFormat(req, res);
  const id = req.params.id;

  User.findById(id, {hashPass: false})
    .then(data => {
      if (data){
        sendMessage(res, 1, data);
      } else {
        sendError(res,404,-1,"Not found User with id " + id );
      }
    })
    .catch(err => {
      sendError(res,500,-1,err.message || "Error retrieving User with id=" + id );
    });
};

// Update a User by the id in the request
exports.update = (req, res) => {
  checkFormat(req, res);
  if (!req.body) {
    sendError(res,400,-1,"Data to update can not be empty!");
  } else{
    const id = req.params.id;

    User.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
      .then(data => {
        if (data) {
          sendMessage(res, 1, { message: "User was updated successfully." });
        } else {
          sendError(res,404,-1,`Cannot update User with id=${id}. Maybe User was not found!`);
        }
      })
      .catch(err => {
        sendError(res,500,-1,err.message || "Error updating User with id=" + id);
      });
  }
};

// Delete a User with the specified id in the request
exports.delete = (req, res) => {
  checkFormat(req, res);
  const id = req.params.id;

  User.findByIdAndRemove(id)
    .then(data => {
      if (data) {
        sendMessage(res, 1, { message: "User was deleted successfully!" });
      } else {
        sendError(res,404,-1,`Cannot delete User with id=${id}. Maybe User was not found!`);
      }
    })
    .catch(err => {
      sendError(res,500,-1,err.message || "Could not delete User with id=" + id);
    });
};

// Delete all Users from the database.
exports.deleteAll = (req, res) => {
  checkFormat(req, res);
  User.deleteMany({})
    .then(data => {
      sendMessage(res, 1,{
        message: `${data.deletedCount} Users were deleted successfully!`
      });
    })
    .catch(err => {
      sendError(res,500,-1,err.message || "Some error occurred while removing all Users.");
    });
};
