const { Router } = require("express");
const { check } = require("express-validator");

const { login, forgotPassword } = require("../controllers/auth");
const { validarCampos } = require("../middlewares/validar-campos");

const router = Router();

router.post(
  "/login",
  [
    check("identifier", "El correo es obligatorio").isEmail(),
    check("password", "El password es obligatorio").not().isEmpty(),
    validarCampos,
  ],
  login
);

router.post(
  "/forgot-password",
  [check("email", "El correo es obligatorio").isEmail(), validarCampos],
  forgotPassword
);

module.exports = router;
