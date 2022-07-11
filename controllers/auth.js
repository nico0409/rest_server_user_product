const { response } = require("express");
const bcryptjs = require("bcryptjs");

const Usuario = require("../models/usuario");
const { generarJWT } = require("../helpers/generarJWT");

const login = async (req, res) => {
  const { identifier, password } = req.body;

  try {
    //verificar que el correo exista
    const user = await Usuario.findOne({ email: identifier });
    if (!user) {
      return res.status(400).json({
        msg: "El correo no existe",
      });
    }

    //verificar si el usuario esta activo

    if (user.blocked) {
      return res.status(400).json({
        msg: "El usuario no esta activo",
      });
    }
    //verificar que el password sea correcto
    const validPassword = bcryptjs.compareSync(password, user.password);
    if (!validPassword) {
      return res.status(400).json({
        msg: "El password es incorrecto",
      });
    }

    //generar el jwt
    const jwt = await generarJWT(user._id);

    res.json({
      jwt,
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      log: error,
      msg: "hable con el administrador",
    });
  }
};

module.exports = {
  login,
};
