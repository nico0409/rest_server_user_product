const { Schema, model, ObjectId } = require("mongoose");

const addressesSchema = Schema({
  title: {
    type: String,
    required: [true, "El campo title es obligatorio"],
  },

  city: {
    type: String,
    required: [true, "El campo city es obligatorio"],
  },
  province: {
    type: String,
    required: [true, "El campo province es obligatorio"],
  },
  street: {
    type: String,
    required: [true, "El campo street es obligatorio"],
    unique: true,
  },
  number: {
    type: String,
    required: [true, "EL campo number es obligatoria"],
  },
  postalCode: {
    type: String,
    required: [true, "EL campo postalCode es obligatoria"],
  },
  betweenStreets: {
    type: String,
  },
  floor: {
    type: String,
  },
  department: {
    type: String,
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
  users_permissions_user: {
    type: ObjectId,
    default: false,
  },
});

addressesSchema.methods.toJSON = function () {
  const { __v, ...usuario } = this.toObject();

  return usuario;
};

module.exports = model("addresse", addressesSchema);
