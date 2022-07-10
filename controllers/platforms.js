const { response, request } = require("express");
const Mongoose = require("mongoose");

const Platform = require("../models/platform");

const GetAllPlatforms = async (req = request, res = response) => {
  const { _sort } = req.query;

  const sort = _sort ? _sort.split(":") : ["position", "asc"];
  const platforms = await Platform.find().sort({ [sort[0]]: sort[1] });
  res.json(platforms);
};

module.exports = {
  GetAllPlatforms,
};
