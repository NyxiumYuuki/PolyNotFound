module.exports = mongoose => {
  let schema = mongoose.Schema({
      images: [],
      text: String,
      subjectTarget: [],
      seen: Number
    },
    { timestamps: true }
  );

  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  return mongoose.model("ad", schema);
};
