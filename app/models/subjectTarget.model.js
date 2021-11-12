module.exports = mongoose => {
  let schema = mongoose.Schema({
      name: String,
      keywords: []
    },
    { timestamps: true }
  );

  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  return mongoose.model("subjectTarget", schema);
};
