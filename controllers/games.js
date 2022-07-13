const { response, request } = require("express");
const Mongoose = require("mongoose");

const Game = require("../models/game");
const Poster = require("../models/poster");
const Platform = require("../models/platform");

const GetAllGames = async (req = request, res = response) => {
  const {
    ["platform.url"]: platform,
    _sort,
    _limit,
    _start,
    url,
    _q,
  } = req.query;

  const sort = _sort ? _sort.split(":") : ["createdAt", "desc"];
  const limit = _limit ? parseInt(_limit) : 10;
  const start = _start ? parseInt(_start) : 0;
  let games = [];
  if (platform) {
    const platformOb = await Platform.findOne({ url: platform });
    const platformId = platformOb._id;

    if (platformId) {
      games = await Game.find({
        platform: Mongoose.Types.ObjectId(platformId),
      })
        .sort({ [sort[0]]: sort[1] })
        .skip(start)
        .limit(limit);
    }
  }
  if (!platform) {
    games = await Game.find()
      .sort({ [sort[0]]: sort[1] })
      .skip(start)
      .limit(limit);
  }
  if (url) {
    games = await Game.find({
      url: url,
    })
      .sort({ [sort[0]]: sort[1] })
      .skip(start)
      .limit(limit);
  }
  if (_q) {
    games = await Game.find({
      $or: [
        {
          title: { $regex: _q, $options: "i" },
        },
      ],
    })
      .sort({ [sort[0]]: sort[1] })
      .skip(start)
      .limit(limit);
  }

  for await (const game of games) {
    const poster = await Poster.findById(game.poster[0]);
    game.poster = { url: poster.url };

    const screenshots = await Promise.all(
      game.screenshots.map(async (screenshot) => {
        const poster = await Poster.findById(screenshot);
        return {
          url: poster.url,
          alternativeText: poster.alternativeText,
          caption: poster.caption,
          id: poster._id,
          name: poster.name,
        };
      })
    );
    game.screenshots = screenshots;
  }

  res.json(games);
};

const getNumberGamesByPlatform = async (req = request, res = response) => {
  const { ["platform.url"]: platform } = req.query;

  let games = [];
  if (platform) {
    const platformOb = await Platform.findOne({ url: platform });
    const platformId = platformOb._id;

    if (platformId) {
      games = await Game.find({
        platform: Mongoose.Types.ObjectId(platformId),
      });
    }
  } else {
    res.status(400).json({
      error: "No se ha encontrado la plataforma",
    });
  }

  res.json(games.length);
};

module.exports = {
  GetAllGames,
  getNumberGamesByPlatform,
};
