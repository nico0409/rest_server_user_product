const { Router } = require("express");
const { check } = require("express-validator");
const { validarJWT, validarCampos } = require("../middlewares");
const { postOrder } = require("../controllers/orders");

const router = Router();

router.post("/", [validarJWT], postOrder);

module.exports = router;
