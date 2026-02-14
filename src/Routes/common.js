const express = require("express");
const Contactform = require("../Controllers/common.js")
const commonrouter = express.Router();

commonrouter.post("/contactform", Contactform);

module.exports = commonrouter;