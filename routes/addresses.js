const { Router } = require("express");
const { check } = require("express-validator");

const {
  validarCampos,
  validarJWT,
  esAdminRole,
  tieneRole,
} = require("../middlewares");

const {
  esRoleValido,
  emailExiste,
  existeUsuarioPorId,
  existeUsuarioPorUsername,
} = require("../helpers/db-validators");

const {
  addressesPost,
  addressesPut,
  addressesGet,
  addressesDelete,
} = require("../controllers/addresses");

const router = Router();

router.post(
  "/",
  [
    validarJWT,
    check("title", "El campo title  nombre es obligatorio").not().isEmpty(),
    check("city", "El campo city  nombre es obligatorio").not().isEmpty(),
    check("province", "El campo province nombre es obligatorio")
      .not()
      .isEmpty(),
    check("street", "El campo street nombre es obligatorio").not().isEmpty(),
    check("number", "El campo number nombre es obligatorio").not().isEmpty(),
    check("postalCode", "El campo postalCode es obligatorio").not().isEmpty(),
    validarCampos,
  ],
  addressesPost
);

router.put(
  "/:id",
  [validarJWT, check("id", "No es un ID válido").isMongoId(), validarCampos],
  addressesPut
);

router.get("/", [validarJWT], addressesGet);

router.delete(
  "/:id",
  [validarJWT, check("id", "No es un ID válido").isMongoId(), validarCampos],
  addressesDelete
);

module.exports = router;
