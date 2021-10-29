module.exports = mongoose => {
  let schema = mongoose.Schema({
      login: String,
      hashPass: String,     // WARNING: We don't want to send back the hashPass
      mail: String,
      role: Object
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
