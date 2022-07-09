const { Schema, model, ObjectId } = require("mongoose");

const UsuarioSchema = Schema({
  name: {
    type: String,
    required: [true, "El nombre es obligatorio"],
  },

  lastname: {
    type: String,
    required: [true, "El apeid es obligatorio"],
  },
  username: {
    type: String,
    required: [true, "El usuario es obligatorio"],
  },
  email: {
    type: String,
    required: [true, "El correo es obligatorio"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "La contraseña es obligatoria"],
  },
  provider: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: {
    type: Date,
    default: Date.now(),
  },
  role: {
    type: ObjectId,
  },
  updated_by: {
    type: String,
    default: Date.now(),
  },
  blocked: {
    type: Boolean,
    default: false,
  },
  confirmed: {
    type: Boolean,
    default: true,
  },

  /*   google: {
    type: Boolean,
    default: false,
  }, */
});

UsuarioSchema.methods.toJSON = function () {
  const { __v, password, _id, ...usuario } = this.toObject();
  usuario._id = _id;
  return usuario;
};

module.exports = model("users-permissions_user", UsuarioSchema);
