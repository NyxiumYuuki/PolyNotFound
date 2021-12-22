module.exports = mongoose => {
  let schema = mongoose.Schema({
      userId: String,
      title: String,
      images: {
        type: Array,
        default: []
      },
      url: {
        type: String,
        default: null
      },
      interests: {
        type: Array,
        default: []
      },
      comment: {
        type: String,
        default: null
      },
      views: {
        type: Array,
        default: []
      },
      isVisible: {
        type: Boolean,
        default: true
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

  return mongoose.model("ads", schema);
};
