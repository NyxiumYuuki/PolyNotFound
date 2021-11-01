const db = require("../models/mongodb.model");
const {sendError, sendMessage} = require ("../config/response.config");
const {checkLogin, setSessionCookie, getSession, getToken} = require("../config/sessionJWT.config");
const ObjectId = require('mongoose').Types.ObjectId;
const roles = require("../config/role.config");
const User = db.users;

// Authenticate a User
exports.auth = (req, res) => {
  // Validate request
  if (!req.body.login || !req.body.hashPass) {
    sendError(res, 400,-1,"Content can not be empty . (login and hashPass needed)");
  } else{
    // Check User in the database
    User
      .findOne({login: req.body.login, hashPass: req.body.hashPass}, {role: true})
      .then(data => {
        if (data !== null){
          setSessionCookie(req, res, {id: data._id, login: req.body.login, role: data.role});
          return sendMessage(res, 1, {id: data._id, login: req.body.login, role: data.role});
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
exports.logout = (req, res) => {
  const token = checkLogin(req, res);
  if(token){
    setSessionCookie(req, res, {id: -1, login: -1, role: -1});
    return sendMessage(res, 1, {message: "User disconnected"}, token);
  }
};

// Create and Save a new User
exports.create = (req, res) => {
  // Validate request
  if (!req.body.login || !req.body.hashPass || !req.body.mail) {
    sendError(res, 400,-1,"Content can not be empty . (login, hashPass and mail needed");
  }
  else{
    User.exists({login: req.body.login}, function (err, docs){
      if(err){
        sendError(res, 500,-1,err.message || "Some error occurred while checking if the User already exists.");
      } else{
        if(docs === null) {
          let user;
          const session = getSession(req.cookies.SESSIONID);
          const token = getToken(session);
          if(token.login === 'undefined' || token.login === -1){
            if(req.body.role === 'undefined'){
              sendError(res, 500, -1, "Must be connected to set role of a User.");
            } else{
              user = new User({
                login: req.body.login,
                hashPass: req.body.hashPass,
                mail: req.body.mail
              });
            }
          } else {
            if(token.role !== 'undefined' &&
              req.body.role !== 'undefined' &&
              req.body.role.permission !== 'undefined' &&
              token.role.permission >= req.body.role.permission){
              user = new User({
                login: req.body.login,
                hashPass: req.body.hashPass,
                mail: req.body.mail,
                role: req.body.role
              });
            } else {
              user = new User({
                login: req.body.login,
                hashPass: req.body.hashPass,
                mail: req.body.mail
              });
            }
          }
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
          sendError(res, 500, -1, err || `User ${req.body.login} already exists.`);
        }
      }
    });
  }
};

// Retrieve all Users from the database if admin.
exports.findAll = (req, res) => {
  const token = checkLogin(req, res, roles.Admin);
  if(token){
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

// Find a single User by session id or by id if admin
exports.findOne = (req, res) => {
  const token = checkLogin(req, res);
  if(token){
    let id;
    if([roles.Admin, roles.SuperAdmin].includes(token.role)){
      if(typeof req.params.id === 'undefined'){
        id = token.id;
      } else{
        id = req.params.id;
      }
    } else{
      id = token.id;
    }
    User.findById(new ObjectId(id), {hashPass: false})
      .then(data => {
        if(data){
          sendMessage(res, 1, data, token);
        } else {
          sendError(res,404,-1,"User not found with id " + id, token);
        }
      })
      .catch(err => {
        sendError(res,500,-1,err.message || "Error retrieving User with id=" + id, token);
      });
  }
};

// Update a User by the id in the request
exports.update = (req, res) => {
  const token = checkLogin(req, res);
  if(req.body && token) {
    let id;
    if ([roles.Admin, roles.SuperAdmin].includes(token.role)) {
      id = req.params.id;
    } else {
      id = token.id;
    }
    User.findByIdAndUpdate(id, req.body, {useFindAndModify: false})
      .then(data => {
        if (data) {
          sendMessage(res, 1, {message: "User was updated successfully."});
        } else {
          sendError(res, 404, -1, `Cannot update User with id=${id}. Maybe User was not found.`);
        }
      })
      .catch(err => {
        sendError(res, 500, -1, err.message || "Error updating User with id=" + id);
      });
  } else {
    sendError(res, 400, -1, "Data to update can not be empty.");
  }
};

// Delete a User with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  User.findByIdAndRemove(id)
    .then(data => {
      if (data) {
        sendMessage(res, 1, { message: "User was deleted successfully." });
      } else {
        sendError(res,404,-1,`Cannot delete User with id=${id}. Maybe User was not found.`);
      }
    })
    .catch(err => {
      sendError(res,500,-1,err.message || "Could not delete User with id=" + id);
    });
};

// Delete all Users from the database.
exports.deleteAll = (req, res) => {
  const token = checkLogin(req, res, roles.SuperAdmin);
  if(token) {
    User.deleteMany({})
      .then(data => {
        sendMessage(res, 1, {
          message: `${data.deletedCount} Users were deleted successfully.`
        });
      })
      .catch(err => {
        sendError(res, 500, -1, err.message || "Some error occurred while removing all Users.");
      });
  }
};

// Get all Roles depending on the role of the User
exports.roles = (req, res) => {
  const token = checkLogin(req, res);
  if(token){
    let rolesP = [];
    for(const [roleName, role] of Object.entries(roles)){
      if(role.permission < token.role.permission){
        rolesP.push(role);
      }
    }
    if(Object.entries(rolesP).length === 0){
      sendError(res, 500, -1, "User do not have permission to see & create user with roles.", token);
    } else{
      sendMessage(res, 1, rolesP);
    }
  }
};
