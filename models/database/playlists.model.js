module.exports = mongoose => {
  let schema = mongoose.Schema({
      userId: String,
      videoIds: {
        type: Array,
        default: []
      },
      name: String,
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

  return mongoose.model("playlists", schema);
};
