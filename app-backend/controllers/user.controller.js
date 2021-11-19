const db = require("../models/mongodb.model");
const {sendError, sendMessage} = require ("../config/response.config");
const {checkLogin, setSessionCookie, getSession, getToken} = require("../config/sessionJWT.config");
const ObjectId = require('mongoose').Types.ObjectId;
const roles = require("../config/role.config");
const User = db.users;
const History = db.histories;

// Authenticate a User
exports.auth = (req, res) => {
  // Validate request
  if (!req.body.login || !req.body.hashPass) {
    sendError(res, 400,-1,"Content can not be empty . (login and hashPass needed)");
  } else{
    // Check User in the database
    User
      .findOne({login: req.body.login, hashPass: req.body.hashPass, active: true}, {role: true})
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
    sendError(res, 400,-1,"Content can not be empty . (login, hashPass and email needed");
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
          if((typeof token.login === 'undefined' || token.login === -1) && typeof req.body.role === 'undefined'){
            user = new User({
              login: req.body.login,
              hashPass: req.body.hashPass,
              mail: req.body.mail,
              profilePictureUrl: req.body.profilePictureUrl ? req.body.profilePictureUrl : null,
              dateOfBirth: req.body.dateOfBirth ? req.body.dateOfBirth : null,
              gender: req.body.gender ? req.body.gender : null,
              interests: req.body.interests ? req.body.interests : null
            });
          } else if(typeof token.role !== 'undefined' &&
              typeof req.body.role !== 'undefined' &&
            typeof req.body.role.permission !== 'undefined' &&
            token.role.permission > req.body.role.permission) {
            user = new User({
              login: req.body.login,
              hashPass: req.body.hashPass,
              mail: req.body.mail,
              role: req.body.role,
              profilePictureUrl: req.body.profilePictureUrl ? req.body.profilePictureUrl : null,
              dateOfBirth: req.body.dateOfBirth ? req.body.dateOfBirth : null,
              gender: req.body.gender ? req.body.gender : null,
              interests: req.body.interests ? req.body.interests : null
            });
          } else {
            user = new User({
              login: req.body.login,
              hashPass: req.body.hashPass,
              mail: req.body.mail,
              profilePictureUrl: req.body.profilePictureUrl ? req.body.profilePictureUrl : null,
              dateOfBirth: req.body.dateOfBirth ? req.body.dateOfBirth : null,
              gender: req.body.gender ? req.body.gender : null,
              interests: req.body.interests ? req.body.interests : null
            });
          }
          // Save User in the database
          user
            .save(user)
            .then(data => {
              data.active = undefined;
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

// Retrieve all Users from the database if at least admin.
exports.findAll = (req, res) => {
  const token = checkLogin(req, res, roles.Admin);
  if(token){
    let query = {};

    const ids = req.query.ids;
    let condition = ids ? {$in: ids} : {};
    query._id = condition;

    const login = req.query.login;
    condition = login ? { $regex: new RegExp(login), $options: "i" } : undefined;
    query.login = condition;

    const mail = req.query.mail;
    condition = mail ? { $regex: new RegExp(mail), $options: "i" } : undefined;
    query.mail = condition;

    const role = req.query.role;
    condition = role ? { $regex: new RegExp(role), $options: "i" } : undefined;
    query.role = condition;

    const active = req.query.active;
    condition = active ? active : undefined;
    query.active = condition;

    User.find(condition, {hashPass: false})
      .then(data => {
        sendMessage(res, 1, data, token)
      })
      .catch(err => {
        sendError(res,500,-1,err.message || "Some error occurred while retrieving users.", token);
      });
  }
};

// Find a single User by session id
exports.findOne = (req, res) => {
  const token = checkLogin(req, res);
  if(token && typeof req.params.id !== 'undefined') {
    let id = null;
    if(typeof token.id !== 'undefined' && req.params.id === token.id){
      id = req.params.id;
    } else {
      if (typeof token.role !== 'undefined' &&
        typeof token.role.permission !== 'undefined' &&
        token.role.permission >= roles.Admin.permission) {
        id = req.params.id;
      } else {
        sendError(res, 500, -1, `Cannot find User with id=${id}. User do not have the permission`, token);
      }
    }
    if(id){
      User.findById(id, {hashPass: false})
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
  } else {
    sendError(res, 500, -1, `No id given`, token);
  }
};

// Update a User by the id in the request
exports.update = (req, res) => {
  const token = checkLogin(req, res);
  if(token && typeof req.params.id !== 'undefined') {
    let id = null;
    if(typeof token.id !== 'undefined' && req.params.id === token.id){
      id = req.params.id;
    } else {
      if (typeof token.role !== 'undefined' &&
        typeof token.role.permission !== 'undefined' &&
        token.role.permission >= roles.Admin.permission) {
        id = req.params.id;
      } else {
        sendError(res, 500, -1, `Cannot update User with id=${id}. User do not have the permission`, token);
      }
    }
    if(id){
      User.findById(id, {hashPass: false})
        .then(user => {
          if(user){
            const history = new History({update: user});
            history
              .save(history)
              .then(data => {
                if(data) {
                  User.findByIdAndUpdate(id, req.body, {useFindAndModify: false})
                    .then(data => {
                      data.hashPass = undefined;
                      console.log(data);
                      if (data) {
                        sendMessage(res, 1, {message: "User was updated successfully."}, token);
                      } else {
                        sendError(res, 404, -1, `Cannot update User with id=${id}. Maybe User was not found.`, token);
                      }
                    })
                    .catch(err => {
                      sendError(res, 500, -1, err.message || "Error updating User with id=" + id, token);
                    });
                }
              })
              .catch(err => {
                sendError(res, 500,-1,err.message || "Some error occurred while creating the User.");
              });
          } else {
            sendError(res,404,-1,"User not found with id " + id, token);
          }
        })
        .catch(err => {
          sendError(res,500,-1,err.message || "Error retrieving User with id=" + id, token);
        });
    }
  } else {
    sendError(res, 500, -1, `No id given`, token);
  }
};

// Delete a User with the specified id in the request
exports.delete = (req, res) => {
  const token = checkLogin(req, res);
  if(token && typeof req.params.id !== 'undefined') {
    let id = null;
    if(typeof token.id !== 'undefined' && req.params.id === token.id){
      id = req.params.id;
    } else {
      if (typeof token.role !== 'undefined' &&
        typeof token.role.permission !== 'undefined' &&
        token.role.permission >= roles.Admin.permission) {
        id = req.params.id;
      } else {
        sendError(res, 500, -1, `Cannot delete User with id=${id}. User do not have the permission`, token);
      }
    }
    if(id && ObjectId.isValid(id)){
      User.findById(id, {hashPass: false})
        .then(user => {
          if(user){
            const history = new History({delete: user});
            history
              .save(history)
              .then(data => {
                if(data) {
                  User.findByIdAndRemove(id)
                    .then(data => {
                      if (data) {
                        sendMessage(res, 1, {message: `User ${id} was deleted successfully.`}, token);
                      } else {
                        sendError(res, 404, -1, `Cannot delete User with id=${id}. Maybe User was not found.`, token);
                      }
                    })
                    .catch(err => {
                      sendError(res, 500, -1, err.message || "Could not delete User with id=" + id, token);
                    });
                }
              })
              .catch(err => {
                sendError(res, 500,-1,err.message || "Some error occurred while creating the User.");
              });
          } else {
            sendError(res,404,-1,"User not found with id " + id, token);
          }
        })
        .catch(err => {
          sendError(res,500,-1,err.message || "Error retrieving User with id=" + id, token);
        });
    } else {
      sendError(res, 500, -1, `Error id is not valid`, token);
    }
  } else {
    sendError(res, 500, -1, `No id given`, token);
  }
};

// Delete all Users from the database except superAdmin
exports.deleteAll = (req, res) => {
  const token = checkLogin(req, res, roles.SuperAdmin);
  if(token) {
    User.deleteMany({login: {$ne: "superAdmin"}})
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
