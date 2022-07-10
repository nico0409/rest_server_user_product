const { Router } = require("express");
const { check } = require("express-validator");

const { validarCampos } = require("../middlewares");

const { GetAllPlatforms } = require("../controllers/platforms");

const router = Router();

router.get("/", GetAllPlatforms);

module.exports = router;
