module.exports = mongoose => {
  let schema = mongoose.Schema({
      url: String,
      title: String,
      description: String,
      views: Number
    },
    { timestamps: true }
  );

  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  return mongoose.model("video", schema);
};
