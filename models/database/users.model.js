const roles = require("../objects/role.model");

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
      profileImageUrl: {
        type: String,
        default: "https://www.handiclubnimois.fr/wp-content/uploads/2020/10/blank-profile-picture-973460_1280.png"
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
