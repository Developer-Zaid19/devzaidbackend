const express = require("express");
const {Contactform, fetchclients} = require("../Controllers/common.js")
const commonrouter = express.Router();

commonrouter.post("/contactform", Contactform);
commonrouter.post("/fetchclients", fetchclients);

module.exports = commonrouter;