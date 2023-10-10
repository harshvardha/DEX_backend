const express = require("express");
const { getTokenPrices } = require("../controllers/TokenPriceController");
const tokenRouter = express.Router();

// route for accessing token prices
tokenRouter.get("/price", getTokenPrices);

module.exports = tokenRouter