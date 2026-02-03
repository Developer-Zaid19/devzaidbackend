const express = require("express");
const { getblog, getnotes, postblog, getBlogBySlug, postnotes, downloadnotes } = require("../Controllers/maincontroller.js");
const filehandler = require("../middleware/filehandler.js")
const uploadpdf = require("../middleware/uploadpdf.js")

const router = express.Router();
router.get("/blogs", getblog);
router.get("/blogs/:blogslug", getBlogBySlug);
router.get("/notes", getnotes);
router.get("/notes/:id", downloadnotes);
router.post("/postblog", postblog);
router.post("/postnote",
    uploadpdf.single("file"),
    postnotes);
module.exports = router;
