const express = require("express");
const { getblog, getnotes, postblog, getBlogBySlug, postnotes, downloadnotes, getprojectlist, projectbyslug, getnumberofblogs } = require("../Controllers/contentwebandapp.js");
const uploadpdf = require("../middleware/uploadpdf.js")

const contentrouter = express.Router();

contentrouter.get("/blogs", getblog);
contentrouter.get("/totalblog", getnumberofblogs);
contentrouter.get("/blogs/:blogslug", getBlogBySlug);
contentrouter.get("/notes", getnotes);  // isko pakadna hai
contentrouter.get("/notes/:id", downloadnotes); // isko pakadna hai
contentrouter.get("/projects", getprojectlist); // isko naya banaya hai
contentrouter.get("/projects/:slug", projectbyslug); // isko naya banaya hai
contentrouter.post("/postblog", postblog);
contentrouter.post("/postnote",
    uploadpdf.single("file"),
    postnotes);
module.exports = contentrouter;
