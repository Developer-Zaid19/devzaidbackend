const express = require("express");
const { getblog, getnotes, postblog, getBlogBySlug, postnotes, downloadnotes } = require("../Controllers/contentwebandapp.js");
const uploadpdf = require("../middleware/uploadpdf.js")

const contentrouter = express.Router();

contentrouter.get("/blogs", getblog);
contentrouter.get("/blogs/:blogslug", getBlogBySlug);
contentrouter.get("/notes", getnotes);
contentrouter.get("/notes/:id", downloadnotes);
contentrouter.post("/postblog", postblog);
contentrouter.post("/postnote",
    uploadpdf.single("file"),
    postnotes);
module.exports = contentrouter;
