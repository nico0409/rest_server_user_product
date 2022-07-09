const { response, request } = require("express");
const jwt = require("jsonwebtoken");
const Usuario = require("../models/usuario");

const validarJWT = async (req = request, res = response, next) => {
  const token = req.header("authorization").replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({
      ok: false,
      msg: "No hay token en la petición",
    });
  }

  try {
    const { _id } = jwt.verify(token, process.env.JWT_SECRET);

    const usuario = await Usuario.findById(_id);
    if (!usuario) {
      return res.status(401).json({
        msg: "usuario no existe",
      });
    }

    //verificar el estado del usuario
    if (usuario.blocked) {
      return res.status(401).json({
        msg: "El usuario esta deshabilitado",
      });
    }
    req.usuario = usuario;
    req._id = _id;
  } catch (error) {
    return res.status(401).json({
      ok: false,
      msg: "Token no válido",
    });
  }

  next();
};

module.exports = { validarJWT };
