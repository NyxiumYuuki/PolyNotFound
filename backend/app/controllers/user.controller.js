const db = require("../models/mongodb.model");
const {sendError, sendMessage} = require ("../config/response.config");
const {checkLogin, setSessionCookie} = require("../config/sessionJWT.config");
const roles = require("../config/role.config");
const User = db.users;

// Authenticate a User
exports.auth = (req, res) => {
  // Validate request
  if (!req.body.login || !req.body.hashPass) {
    sendError(res, 400,-1,"Content can not be empty ! (login and hashPass needed)");
  } else{
    // Check User in the database
    User
      .findOne({login: req.body.login, hashPass: req.body.hashPass}, {role: true})
      .then(data => {
        if (data !== null){
          setSessionCookie(req, res, {id: data._id, login: req.body.login, role: data.role});
          return sendMessage(res, 1, true);
        } else {
          setSessionCookie(req, res, {id: -1, login: -1, role: -1 });
          return sendError(res, 500, -1, "Invalid login or password.");
        }
      })
      .catch(err => {
        sendError(res, 500,-1,err.message || "Some error occurred while authenticating the User.");
      });
  }
};

// Logout a User
exports.disconnect = (req, res) => {
  const token = checkLogin(req, res);
  if(token){
    console.log(token);
    setSessionCookie(req, res, {id: -1, login: -1, role: -1});
    return sendMessage(res, 1, {message: "User disconnected"}, token);
  }
};

// Create and Save a new User
exports.create = (req, res) => {
  // Validate request
  if (!req.body.login || !req.body.hashPass || !req.body.mail) {
    sendError(res, 400,-1,"Content can not be empty ! (login, hashPass and mail needed");
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

// Retrieve all Users from the database if admin.
exports.findAll = (req, res) => {
  const token = checkLogin(req, res, [roles.Admin]);
  if(token){
    console.log(token);
    const login = req.query.login;
    let condition = login ? { login: { $regex: new RegExp(login), $options: "i" } } : {};

    User.find(condition, {hashPass: false})
      .then(data => {
        sendMessage(res, 1, data, token)
      })
      .catch(err => {
        sendError(res,500,-1,err.message || "Some error occurred while retrieving users.", token);
      });
  }
};

// Find a single User with login if admin or login from cookie session
exports.findOne = (req, res) => {
  const token = checkLogin(req, res);
  if(token){
    let login;
    if(token.role === [roles.Admin]){
      login = req.params.login;

    } else{
      login = token.login;
    }
    console.log(token.role, login);
    User.find({login: login}, {hashPass: false})
      .then(data => {
        if (data){
          sendMessage(res, 1, data);
        } else {
          sendError(res,404,-1,"Not found User with login " + login );
        }
      })
      .catch(err => {
        sendError(res,500,-1,err.message || "Error retrieving User with login=" + login );
      });
  }
};

// Update a User by the id in the request
exports.update = (req, res) => {
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
  const token = checkLogin(req, res, [roles.Admin]);
  if(token) {
    console.log(token);
    User.deleteMany({})
      .then(data => {
        sendMessage(res, 1, {
          message: `${data.deletedCount} Users were deleted successfully!`
        });
      })
      .catch(err => {
        sendError(res, 500, -1, err.message || "Some error occurred while removing all Users.");
      });
  }
};
