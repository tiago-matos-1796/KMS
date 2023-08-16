module.exports = (mongoose) => {
  const schema = mongoose.Schema(
    {
      _id: { type: String, require: true },
      public_key: { type: String, required: true },
      private_key: { type: String, require: true },
      iv: { type: String, required: true },
      tag: { type: String, required: true },
    },
    {
      collection: "signature",
    },
  );
  return mongoose.model("signature", schema);
};
