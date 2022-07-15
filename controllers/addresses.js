const { response, request } = require("express");
const Mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");

const Addresse = require("../models/addresse");

const addressesPost = async (req, res = response) => {
  const {
    title,
    city,
    province,
    street,
    number,
    postalCode,
    betweenStreets,
    floor,
    department,
    _id,
  } = req.body;

  const addresse = new Addresse({
    title,
    city,
    province,
    street,
    number,
    postalCode,
    betweenStreets,
    floor,
    department,
    users_permissions_user: Mongoose.Types.ObjectId(_id),
  });

  // Guardar en BD
  await addresse.save();

  res.json({
    addresse,
  });
};

const addressesGet = async (req = request, res = response) => {
  const { users_permissions_user } = req.query;
  if (users_permissions_user) {
    const query = {
      users_permissions_user: Mongoose.Types.ObjectId(users_permissions_user),
    };
    const [addresse] = await Promise.all([Addresse.find(query)]);

    res.json(addresse);
  } else {
    res.status(400).json("el usuario es requerido");
  }
};

const addressesPut = async (req, res = response) => {
  const { id } = req.params;
  const { _id, ...resto } = req.body;
  const addresse = await Addresse.findByIdAndUpdate(id, resto);
  res.json({
    addresse,
  });
};
const addressesDelete = async (req, res = response) => {
  const { id } = req.params;
  const addresse = await Addresse.findByIdAndDelete(id);
  res.json({
    addresse,
  });
};
module.exports = {
  addressesPost,
  addressesGet,
  addressesPut,
  addressesDelete,
};
