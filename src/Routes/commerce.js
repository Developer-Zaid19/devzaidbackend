const express = require("express");
const { downloadOrder, getapkproducts, getapkbyslug } = require("../Controllers/commerce.js")
const Commercerouter = express.Router();

Commercerouter.post("/downloadcart", downloadOrder);
Commercerouter.get("/apks", getapkproducts);
Commercerouter.get("/apks/:slug", getapkbyslug);

module.exports = Commercerouter;