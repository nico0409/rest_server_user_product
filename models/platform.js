const { Schema, model, ObjectId } = require("mongoose");

const PlatformSchema = Schema({
  title: {
    type: String,
    required: [true, "El campo title es obligatorio"],
  },
  url: {
    type: String,
    required: [true, "El campo url es obligatorio"],
    unique: true,
  },
  position: {
    type: Number,
    required: [true, "El campo position es obligatorio"],
  },
  published_at: {
    type: Date,
    default: Date.now(),
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: {
    type: Date,
    default: Date.now(),
  },
  created_by: {
    type: ObjectId,
    required: [true, "El campo created_by es obligatorio"],
  },
  updated_by: {
    type: ObjectId,
    required: [true, "El campo updated_by es obligatorio"],
  },
});
PlatformSchema.methods.toJSON = function () {
  const { __v, ...platform } = this.toObject();

  return platform;
};

module.exports = model("platform", PlatformSchema);
