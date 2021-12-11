module.exports = mongoose => {
  let schema = mongoose.Schema({
      userId: String,
      videoId: String,
      source: String,
      interest: {
        type: String,
        default: null
      },
      watchedDates: {
        type: Array,
        default: null
      },
      isActive: {
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

  return mongoose.model("videos", schema);
};
