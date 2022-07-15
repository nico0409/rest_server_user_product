const { Router } = require("express");
const { check } = require("express-validator");
const { validarJWT, validarCampos } = require("../middlewares");
const { postOrder, getOrder } = require("../controllers/orders");

const router = Router();

router.get("/", validarJWT, getOrder);

router.post("/", [validarJWT], postOrder);

module.exports = router;
