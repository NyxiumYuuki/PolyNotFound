const roles = require("../config/role.config");

module.exports = mongoose => {
  let schema = mongoose.Schema({
      login: String,
      hashPass: String,     // WARNING: We don't want to send back the hashPass
      mail: String,
      role: {
        type: Object,
        default: roles.User
      },
      profilePictureUrl: {
        type: String,
        default: null
      },
      dateOfBirth: {
        type: Date,
        default: null
      },
      gender: {
        type: String,
        default: null
      },
      interests: {
        type: Array,
        default: null
      },
      active: {
        type: Boolean,
        default: true
      }
    },
    { timestamps: true }
  );

  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  return mongoose.model("user", schema);
};
