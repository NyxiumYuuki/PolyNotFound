module.exports = mongoose => {
  let schema = mongoose.Schema({
      userId: String,
      videoId: String,
      source: String,
      tags: Array,
      interest: String,
      watchedDates: Array
    },
    { timestamps: true }
  );

  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  return mongoose.model("videos", schema);
};