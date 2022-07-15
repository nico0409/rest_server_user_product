const { response, request } = require("express");
const Mongoose = require("mongoose");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const Game = require("../models/game");
const Poster = require("../models/poster");
const Platform = require("../models/platform");
const Order = require("../models/order");

const postOrder = async (req = request, res = response) => {
  const { token, products, idUser, addressShiping } = req.body;

  let totalPayment = 0;
  products.forEach((product) => {
    totalPayment += product.price;
  });

  const paymentIntent = await stripe.charges.create({
    amount: totalPayment,
    currency: "usd",
    source: token.id,
    description: "Test charge7",
  });

  const oders = [];

  for await (const product of products) {
    const data = {
      game: product._id,
      users_permissions_user: idUser,
      totalPayment,
      idPayment: paymentIntent.id,
      addressShiping,
    };

    const order = new Order(data);
    await order.save();
    oders.push(order);
  }

  res.json({
    ok: true,
    oders,
  });
};

const getOrder = async (req = request, res = response) => {
  const { users_permissions_user, _sort } = req.query;

  const sort = _sort ? _sort.split(":") : ["createdAt", "desc"];

  const orders = await Order.find({
    users_permissions_user: users_permissions_user,
  }).sort({ [sort[0]]: sort[1] });

  let ordersConf = [];
  for await (const order of orders) {
    const game = await Game.findById(order.game);
    const poster = await Poster.findById(game.poster);

    game.poster = { url: poster.url };
    ordersConf.push({
      ...order.toJSON(),
      game,
    });
  }

  const arrayRespone = await Promise.all(ordersConf);

  res.json(arrayRespone);
};

module.exports = {
  postOrder,
  getOrder,
};
