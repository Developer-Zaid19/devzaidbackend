const express = require("express");
const { downloadOrder, getapkproducts, getapkbyslug, downloadOrderMobile } = require("../Controllers/commerce.js")
const Commercerouter = express.Router();

Commercerouter.post("/downloadcart", downloadOrder);
Commercerouter.post("/mobiledownloadcart", downloadOrderMobile);
Commercerouter.get("/apks", getapkproducts);
Commercerouter.get("/apks/:slug", getapkbyslug);

module.exports = Commercerouter;