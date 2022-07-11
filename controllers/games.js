const { response, request } = require("express");
const Mongoose = require("mongoose");

const Game = require("../models/game");
const Poster = require("../models/poster");
const Platform = require("../models/platform");

const GetAllGames = async (req = request, res = response) => {
  const { ["platform.url"]: platform, _sort, _limit, _start } = req.query;

  const sort = _sort ? _sort.split(":") : ["createdAt", "desc"];
  const limit = _limit ? parseInt(_limit) : 10;
  const start = _start ? parseInt(_start) : 0;

  const platformOb = await Platform.findOne({ url: platform });
  const platformId = platformOb._id;

  let games = [];
  if (platformId) {
    games = await Game.find({
      platform: Mongoose.Types.ObjectId(platformId),
    })
      .sort({ [sort[0]]: sort[1] })
      .skip(start)
      .limit(limit);
  } else {
    games = await Game.find()
      .sort({ [sort[0]]: sort[1] })
      .skip(start)
      .limit(limit);
  }
  console.log(games);
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

module.exports = {
  GetAllGames,
};
