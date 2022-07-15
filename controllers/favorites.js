const { response, request } = require("express");
const Mongoose = require("mongoose");

const Favorites = require("../models/favorite");
const Game = require("../models/game");
const Poster = require("../models/poster");

const getFavoriteByUserAndGame = async (req = request, res = response) => {
  const { users_permissions_user, game } = req.query;

  if (users_permissions_user === undefined && game === undefined) {
    return res.status(400).json({
      ok: false,
      message: "Faltan parametros",
    });
  } else {
    if (users_permissions_user && !game) {
      const query = {
        users_permissions_user: Mongoose.Types.ObjectId(users_permissions_user),
      };
      const [favorites, games] = await Promise.all([
        Favorites.find(query),
        Game.find({}),
      ]);

      const favoritesWithGame = favorites.map(async (favorite) => {
        const game = games.find(
          (game) => game._id.toString() === favorite.game.toString()
        );

        const poster = await Poster.findById(game.poster);
        game.poster = { url: poster.url };

        return {
          ...favorite.toJSON(),
          game,
        };
      });

      const arrayRespone = await Promise.all(favoritesWithGame);
      res.json(arrayRespone);
    } else if (game && users_permissions_user) {
      const query = {
        users_permissions_user: Mongoose.Types.ObjectId(users_permissions_user),
        game: Mongoose.Types.ObjectId(game),
      };

      const [favorite] = await Promise.all([Favorites.find(query)]);

      res.json(favorite);
    }
  }
};

const setFavoriteByUserAndGame = async (req = request, res = response) => {
  const { users_permissions_user, game } = req.body;
  const query = {
    users_permissions_user: Mongoose.Types.ObjectId(users_permissions_user),
    game: Mongoose.Types.ObjectId(game),
  };

  const [favorite] = await Promise.all([Favorites.find(query)]);

  if (favorite.length > 0) {
    return res.status(400).json({
      ok: false,
      message: "El juego ya esta en favoritos",
    });
  }
  const newFavorite = new Favorites({
    users_permissions_user: Mongoose.Types.ObjectId(users_permissions_user),
    game: Mongoose.Types.ObjectId(game),
  });
  const favoriteSaved = await newFavorite.save();
  res.json(favoriteSaved);
};

const deleteFavoriteByUserAndGame = async (req = request, res = response) => {
  const { idGame } = req.params;
  const { _id } = req.body;
  console.log(idGame, _id);

  const favorite = await Favorites.findById(idGame);
  if (favorite.length === 0) {
    return res.status(400).json({
      ok: false,
      message: "El juego no esta en favoritos",
    });
  }
  const favoriteDeleted = await Favorites.findByIdAndDelete(idGame);
  res.json(favoriteDeleted);
};
module.exports = {
  getFavoriteByUserAndGame,
  setFavoriteByUserAndGame,
  deleteFavoriteByUserAndGame,
};
