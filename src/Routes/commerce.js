const express = require("express");
const { downloadOrder, getapkproducts } = require("../Controllers/commerce.js")
const Commercerouter = express.Router();

Commercerouter.post("/downloadcart", downloadOrder);
Commercerouter.get("/apks", getapkproducts);

module.exports = Commercerouter;