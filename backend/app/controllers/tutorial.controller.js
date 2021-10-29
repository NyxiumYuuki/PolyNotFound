const db = require("../models/mongodb.model");
const {sendError, sendMessage} = require ("../config/response.config");
const Tutorial = db.tutorials;

// Create and Save a new Tutorial
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    sendError(res, 400,-1,"Content can not be empty!" );
  }

  // Create a Tutorial
  const tutorial = new Tutorial({
    title: req.body.title,
    description: req.body.description,
    published: req.body.published ? req.body.published : false
  });

  // Save Tutorial in the database
  tutorial
    .save(tutorial)
    .then(data => {
      sendMessage(res, 1, data)
    })
    .catch(err => {
      sendError(res, 500,-1,err.message || "Some error occurred while creating the Tutorial.");
    });
};

// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  let condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};

  Tutorial.find(condition)
    .then(data => {
      sendMessage(res, 1, data)
    })
    .catch(err => {
      sendError(res,500,-1,err.message || "Some error occurred while retrieving tutorials.");
    });
};

// Find a single Tutorial with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Tutorial.findById(id)
    .then(data => {
      if (!data)
        sendError(res,404,-1,"Not found Tutorial with id " + id );
      else sendMessage(res, 1, data);
    })
    .catch(err => {
      sendError(res,500,-1,err.message || "Error retrieving Tutorial with id=" + id );
    });
};

// Update a Tutorial by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    sendError(res,400,-1,"Data to update can not be empty!");
  }

  const id = req.params.id;

  Tutorial.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        sendError(res,404,-1,`Cannot update Tutorial with id=${id}. Maybe Tutorial was not found!`);
      } else sendMessage(res, 1, { message: "Tutorial was updated successfully." });
    })
    .catch(err => {
      sendError(res,500,-1,err.message || "Error updating Tutorial with id=" + id);
    });
};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Tutorial.findByIdAndRemove(id)
    .then(data => {
      if (!data) {
        sendError(res,404,-1,`Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found!`);
      } else {
        sendMessage(res, 1, { message: "Tutorial was deleted successfully!" });
      }
    })
    .catch(err => {
      sendError(res,500,-1,err.message || "Could not delete Tutorial with id=" + id);
    });
};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
  Tutorial.deleteMany({})
    .then(data => {
      sendMessage(res, 1, {
        message: `${data.deletedCount} Tutorials were deleted successfully!`
      });
    })
    .catch(err => {
      sendError(res,500,-1,err.message || "Some error occurred while removing all tutorials.");
    });
};

// Find all published Tutorials
exports.findAllPublished = (req, res) => {
  Tutorial.find({ published: true })
    .then(data => {
      sendMessage(res, 1, data);
    })
    .catch(err => {
      sendError(res,500,-1,err.message || "Some error occurred while retrieving tutorials.");
    });
};
