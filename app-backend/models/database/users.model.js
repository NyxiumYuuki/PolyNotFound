const roles = require("../../config/role.config");

module.exports = mongoose => {
  let schema = mongoose.Schema({
      email: String,
      hashPass: String,     // WARNING: We don't want to send back the hashPass
      login: String,
      role: {
        type: Object,
        default: roles.User
      },
      company: String,
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
      isActive: {
        type: Boolean,
        default: true
      },
      isAccepted: {
        type: Boolean,
        default: false
      },
      lastConnexion: {
        type: Date,
        default: null
      }
    },
    { timestamps: true }
  );

  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  return mongoose.model("users", schema);
};
