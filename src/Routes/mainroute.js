const express = require("express");
const { getblog, getnotes, postblog, getBlogBySlug, postnotes } = require("../Controllers/maincontroller.js");
const filehandler = require("../middleware/filehandler.js")

const router = express.Router();
router.get("/blogs", getblog);
router.get("/blogs/:blogslug", getBlogBySlug);
router.get("/notes", getnotes);
router.post("/postblog", postblog);
router.post("/postnote",
    filehandler.single("file"),
    postnotes);
module.exports = router;
