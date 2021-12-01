module.exports = mongoose => {
  let schema = mongoose.Schema({
      userId: String,
      title: String,
      images: Array,
      url: String,
      interests: Array,
      comment: String,
      views: Array,
      isVisible: Boolean,
      isActive: Boolean
    },
    { timestamps: true }
  );

  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  return mongoose.model("ads", schema);
};
