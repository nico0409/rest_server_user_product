const { Schema, model, ObjectId } = require("mongoose");

const favoriteSchema = Schema({
  game: {
    type: ObjectId,
    required: [true, "El campo ObjectId es obligatorio"],
  },
  users_permissions_user: {
    type: ObjectId,
    required: [true, "El campo users_permissions_user es obligatorio"],
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
});

favoriteSchema.methods.toJSON = function () {
  const { __v, ...favorite } = this.toObject();

  return favorite;
};

module.exports = model("favorite", favoriteSchema);
