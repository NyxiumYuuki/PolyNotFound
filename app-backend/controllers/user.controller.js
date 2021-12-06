const db = require("../models/mongodb.model");
const {sendError, sendMessage} = require ("../config/response.config");
const {checkLogin, setSessionCookie, getSession, getToken} = require("../config/sessionJWT.config");
const ObjectId = require('mongoose').Types.ObjectId;
const roles = require("../models/objects/role.model");
const User = db.users;

// Authenticate a User
exports.auth = (req, res) => {
  // Validate request
  if (!req.body.email || !req.body.hashPass) {
    sendError(res, 400,-1,"Content can not be empty . (email and hashPass needed)");
  } else{
    // Check User in the database
    User
      .findOne({email: req.body.email, hashPass: req.body.hashPass, isActive: true}, {role: true, profileImageUrl: true})
      .then(data => {
        if (data !== null){
          User.findByIdAndUpdate(data._id.toString(), {lastConnexion: new Date()}, {useFindAndModify: false},
            function (err) {
              if (err){
                return sendError(res, 400, 100,err.message || "Some error occurred while updating the User.");
              }
              else{
                const dataRes = {id: data._id.toString(), email: req.body.email, profileImageUrl: data.profileImageUrl, role: data.role};
                setSessionCookie(req, res, dataRes);
                return sendMessage(res, 1, dataRes);
              }
            });
        } else {
          setSessionCookie(req, res, {id: -1, email: -1, profileImageUrl: -1, role: -1});
          return sendError(res, 500, 101, "Invalid login or password.");
        }
      })
      .catch(err => {
        return sendError(res, 400, 100,err.message || "Some error occurred while authenticating the User.");
      });
  }
};

// Logout a User
exports.logout = (req, res) => {
  const token = checkLogin(req, res);
  if(token){
    setSessionCookie(req, res, {id: -1, email: -1, profileImageUrl: -1, role: -1});
    return sendMessage(res, 2, {message: "User disconnected"});
  }
};

// Request password reset with email
exports.resetPass = (req, res) => {
  return sendError(res, 501, -1, "User.resetPass not Implemented", null);
};

// Create and Save a new User
exports.create = (req, res) => {
  // Validate request
  if (!req.body.email || !req.body.hashPass || !req.body.login) {
    sendError(res, 400,-1,"Content can not be empty . (email, hashPass and login needed");
  }
  else{
    User.exists({email: req.body.email}, function (err, docs){
      if(err){
        sendError(res, 500,100,err.message || "Some error occurred while checking if the User already exists.");
      } else{
        if(docs === null) {
          let user;
          let var_role;
          if(req.body.role !== 'undefined'){
            switch(req.body.role){
              case 'admin':
                var_role = roles.Admin;
                break;
              case 'advertiser':
                var_role = roles.Advertiser;
                break;
              default:
                var_role = roles.User;
            }
          } else{
            var_role = roles.User;
          }

          user = new User({
            email: req.body.email,
            hashPass: req.body.hashPass,
            login: req.body.login,
            role: var_role,
            company: req.body.company ? req.body.company : null,
            dateOfBirth: req.body.dateOfBirth ? req.body.dateOfBirth : null,
            gender: req.body.gender ? req.body.gender : null,
            interests: req.body.interests ? req.body.interests : null,
          });

          // Save User in the database
          user
            .save(user)
            .then(data => {
              data.active = undefined;
              data.hashPass = undefined; // Hiding hashPass on return
              return sendMessage(res, 4, data)
            })
            .catch(err => {
              return sendError(res, 500,100,err.message || "Some error occurred while creating the User.");
            });
        } else{
          return sendError(res, 500, 104, err || `Email ${req.body.email} already exists.`);
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
    let condition;

    const ids = req.query.userId;
    condition = ids ? {$in: ids} : undefined;
    query._id = condition;

    const email = req.query.email;
    condition = email ? { $regex: new RegExp(email), $options: "i" } : undefined;
    query.email = condition;

    const login = req.query.login;
    condition = login ? { $regex: new RegExp(login), $options: "i" } : undefined;
    query.login = condition;

    const role = req.query.role;
    condition = role ? role : undefined;
    query.role = {name: condition};

    const company = req.query.company;
    condition = company ? { $regex: new RegExp(company), $options: "i" } : undefined;
    query.company = condition;

    const dateOfBirth = req.query.dateOfBirth;
    condition = dateOfBirth ? dateOfBirth : undefined;
    query.dateOfBirth = condition;

    const gender = req.query.gender;
    condition = gender ? gender : undefined;
    query.gender = condition;

    const isActive = req.query.isActive;
    condition = isActive ? isActive : undefined;
    query.isActive = condition;

    const isAccepted = req.query.isAccepted;
    condition = isAccepted ? isAccepted : undefined;
    query.isAccepted = condition;

    const sort = req.query.sort;
    condition = sort ? sort : {email: 1};
    const query_sort = {sort: condition};

    // Remove undefined key
    Object.keys(query).forEach(key => query[key] === undefined ? delete query[key] : {});
    console.log(query);

    User.find(query, {hashPass: false}, query_sort)
      .then(data => {
        sendMessage(res, 5, data, token)
      })
      .catch(err => {
        sendError(res,500,100,err.message || "Some error occurred while retrieving users.", token);
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
        token.role.permission >= roles.Admin.permission &&
        token.role.isAccepted === true) {
        id = req.params.id;
      } else {
        sendError(res, 500, -1, `Cannot delete User with id=${id}. User do not have the permission`, token);
      }
    }
    if(id && ObjectId.isValid(id)){
      User.findById(id, {hashPass: false})
        .then(user => {
          if(user){
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
    sendMessage(res, 10, roles, token);
  }
};

// Get 1 or multiple ad adapted to the User session id
exports.ad = (req, res) => {
  return sendError(res, 501, -1, "User.ad not Implemented", null);
};

// Get History
exports.history = (req, res) => {
  return sendError(res, 501, -1, "User.history not Implemented", null);
};
