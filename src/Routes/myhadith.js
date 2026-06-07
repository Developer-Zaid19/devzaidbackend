
const express = require("express");
const {Contactform, fetchclients} = require("../Controllers/myhadith.js")
const myhadith = express.Router();

myhadith.post("/contactform", Contactform);
myhadith.post("/fetchclients", fetchclients);

module.exports = myhadith;