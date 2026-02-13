const express = require("express");
const Contactform = require("../Controllers/common.js")
const router = express.Router();

router.post("/contactform", Contactform);