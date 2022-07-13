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

module.exports = {
  postOrder,
};
