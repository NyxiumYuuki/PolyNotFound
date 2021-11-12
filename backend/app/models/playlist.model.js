module.exports = mongoose => {
  let schema = mongoose.Schema({
      userId: String,
      name: String,
      videos: Array
    },
    { timestamps: true }
  );

  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  return mongoose.model("playlist", schema);
};
