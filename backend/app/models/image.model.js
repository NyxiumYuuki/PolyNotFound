module.exports = mongoose => {
  let schema = mongoose.Schema({
      base64: String,
      fromUrl: String,
      description: String,
      type: Number
    },
    { timestamps: true }
  );

  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  return mongoose.model("image", schema);
};
