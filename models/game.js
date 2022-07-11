const { Schema, model, ObjectId } = require("mongoose");

const GameSchema = Schema({
  poster: {
    type: Array,
    required: [true, "El campo poster es obligatorio"],
  },
  screenshots: {
    type: Array,
    required: [true, "El campo screenshots es obligatorio"],
  },
  discount: {
    type: Number,
    required: [true, "El campo Number es obligatorio"],
  },
  price: {
    type: Number,
    required: [true, "El campo price es obligatorio"],
  },
  url: {
    type: String,
    required: [true, "El campo url es obligatorio"],
  },
  releaseDate: {
    type: String,
    required: [true, "El campo url es obligatorio"],
  },
  title: {
    type: String,
    required: [true, "El campo url es obligatorio"],
  },
  video: {
    type: String,
    required: [true, "El campo video es obligatorio"],
  },
  sumary: {
    type: String,
    required: [true, "El campo sumary es obligatorio"],
  },
  created_by: {
    type: ObjectId,
    required: [true, "El campo created_by es obligatorio"],
  },
  updated_by: {
    type: ObjectId,
    required: [true, "El campo updated_by es obligatorio"],
  },
  platform: {
    type: ObjectId,
    required: [true, "El campo platform es obligatorio"],
  },
});
GameSchema.methods.toJSON = function () {
  const { __v, ...game } = this.toObject();

  return game;
};

module.exports = model("game", GameSchema);
