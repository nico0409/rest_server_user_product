const { Router } = require("express");
const { check } = require("express-validator");
const { validarJWT, validarCampos } = require("../middlewares");
const {
  getFavoriteByUserAndGame,
  setFavoriteByUserAndGame,
  deleteFavoriteByUserAndGame,
} = require("../controllers/favorites");

const router = Router();

router.get("/", [validarJWT], getFavoriteByUserAndGame);

router.post(
  "/",
  [
    validarJWT,
    check("users_permissions_user", "El users_permissions_user es obligatorio")
      .not()
      .isEmpty(),
    check("game", "El game es obligatorio").not().isEmpty(),
    validarCampos,
  ],
  setFavoriteByUserAndGame
);

router.delete("/:idGame", [validarJWT], deleteFavoriteByUserAndGame);

module.exports = router;
