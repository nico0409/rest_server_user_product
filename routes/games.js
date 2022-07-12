const { Router } = require("express");
const { check } = require("express-validator");

const {
  GetAllGames,
  getNumberGamesByPlatform,
} = require("../controllers/games");

const router = Router();

router.get("/", GetAllGames);

router.get("/count", getNumberGamesByPlatform);

module.exports = router;
