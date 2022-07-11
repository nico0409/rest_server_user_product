const { Schema, model, ObjectId } = require("mongoose");

const Upload_filesSchema = Schema({
  name: {
    type: String,
    required: [true, "El campo url es obligatorio"],
  },

  alternativeText: {
    type: String,
  },

  caption: {
    type: String,
  },
  hash: {
    type: String,
    required: [true, "El campo video es obligatorio"],
  },
  mime: {
    type: String,
    required: [true, "El campo video es obligatorio"],
  },
  ext: {
    type: String,
    required: [true, "El campo sumary es obligatorio"],
  },
  size: {
    type: Number,
    required: [true, "El campo size es obligatorio"],
  },
  width: {
    type: Number,
    required: [true, "El campo width es obligatorio"],
  },
  height: {
    type: Number,
    required: [true, "El campo height es obligatorio"],
  },
  url: {
    type: String,
    required: [true, "El campo url es obligatorio"],
  },
  platform: {
    type: ObjectId,
    required: [true, "El campo platform es obligatorio"],
  },
});
Upload_filesSchema.methods.toJSON = function () {
  const { __v, ...poster } = this.toObject();

  return game;
};

module.exports = model("upload_files", Upload_filesSchema);
