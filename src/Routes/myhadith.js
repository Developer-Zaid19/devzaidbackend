
const express = require("express");
const {gethadithbooklist, gethadithlistbybook, getrandomhadith, gethadithbynumber} = require("../Controllers/myhadith.js")
const myhadith = express.Router();

myhadith.post("/booklist", gethadithbooklist);
myhadith.post("/hadithlist", gethadithlistbybook);
myhadith.post("/randomhadith", getrandomhadith);
myhadith.post("/findhadith", gethadithbynumber);

module.exports = myhadith;