const { Schema, model, ObjectId } = require("mongoose");

const orderSchema = Schema({
  totalPayment: {
    type: Number,
    required: [true, "El campo totalPayment es obligatorio"],
  },
  idPayment: {
    type: String,
    required: [true, "El campo idPayment es obligatorio"],
  },
  addressShiping: {
    type: Object,
    required: [true, "El campo addressShiping es obligatorio"],
  },
  game: {
    type: ObjectId,
    required: [true, "El campo game es obligatorio"],
  },
  users_permissions_user: {
    type: ObjectId,
    required: [true, "El campo users_permissions_user es obligatorio"],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    required: [true, "El campo created_at es obligatorio"],
  },
  published_at: {
    type: Date,
    default: Date.now(),
    required: [true, "El campo published_at es obligatorio"],
  },
  updatedAt: {
    type: Date,
    default: Date.now(),
    required: [true, "El campo updated_at es obligatorio"],
  },
});

orderSchema.methods.toJSON = function () {
  const { __v, ...order } = this.toObject();

  return order;
};

module.exports = model("order", orderSchema);
