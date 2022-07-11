const { Router } = require("express");
const { check } = require("express-validator");

const { GetAllGames } = require("../controllers/games");

const router = Router();

router.get("/", GetAllGames);

module.exports = router;
