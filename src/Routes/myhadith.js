
const express = require("express");
const {gethadithbooklist, gethadithlistbybook, getrandomhadith, gethadithbynumber} = require("../Controllers/myhadith.js")
const myhadith = express.Router();

myhadith.get("/booklist", gethadithbooklist);
myhadith.post("/hadithlist", gethadithlistbybook);
myhadith.get("/randomhadith", getrandomhadith);
myhadith.post("/findhadith", gethadithbynumber);

module.exports = myhadith;