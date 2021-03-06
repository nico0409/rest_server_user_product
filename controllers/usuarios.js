const { response, request } = require("express");
const Mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");

const Usuario = require("../models/usuario");
const { generarJWT } = require("../helpers/generarJWT");

const usuariosGet = async (req = request, res = response) => {
  const { limite = 5, desde = 0 } = req.query;
  const query = { blocked: false };

  const [total, usuarios] = await Promise.all([
    Usuario.countDocuments(query),
    Usuario.find(query).skip(Number(desde)).limit(Number(limite)),
  ]);

  res.json({
    total,
    usuarios,
  });
};

const usuariosPost = async (req, res = response) => {
  const { name, lastname, username, email, password, confirmed, blocked } =
    req.body;
  const user = new Usuario({
    name,
    lastname,
    username,
    email,
    password,
    provider: "local",
    confirmed,
    blocked,
    role: Mongoose.Types.ObjectId("62ae3436718f6517643c1621"),
  });
  let jwt = "";
  // Encriptar la contraseña
  const salt = bcryptjs.genSaltSync();
  user.password = bcryptjs.hashSync(password, salt);

  // Guardar en BD
  await user.save();
  jwt = await generarJWT(user._id);
  res.json({
    jwt,
    user,
  });
};

const usuariosPut = async (req, res = response) => {
  const { id } = req.params;
  const { _id, password, google, correo, ...resto } = req.body;

  if (password) {
    // Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    resto.password = bcryptjs.hashSync(password, salt);
  }

  const usuario = await Usuario.findByIdAndUpdate(id, resto);

  res.json(usuario);
};

const usuariosPatch = (req, res = response) => {
  res.json({
    msg: "patch API - usuariosPatch",
  });
};

const usuariosDelete = async (req, res = response) => {
  const { id } = req.params;
  const usuarioValidado = req.usuario;

  // Fisicamente lo borramos
  // const usuario = await Usuario.findByIdAndDelete( id );

  const usuario = await Usuario.findByIdAndUpdate(id, { estado: false });

  res.status(200).json({ usuario, usuarioValidado });
};

const usuariosPorJWT = async (req = request, res = response) => {
  //obtengo usuario por el JWT en el header

  const usuario = await Usuario.findOne({
    _id: req._id,
  });

  res.json(usuario);
};

module.exports = {
  usuariosGet,
  usuariosPost,
  usuariosPut,
  usuariosPatch,
  usuariosDelete,
  usuariosPorJWT,
};
