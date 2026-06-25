const express = require("express");
const { downloadOrder } = require("../Controllers/commerce.js")
const Commercerouter = express.Router();

Commercerouter.post("/downloadcart", downloadOrder);

module.exports = Commercerouter;