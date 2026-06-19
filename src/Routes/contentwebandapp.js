const express = require("express");
const { getblog, getnotes, postblog, getBlogBySlug, postnotes, downloadnotes, getprojectlist, projectbyslug, getnumberofnotes, getnumberofblogs } = require("../Controllers/contentwebandapp.js");
const uploadpdf = require("../middleware/uploadpdf.js")

const contentrouter = express.Router();

contentrouter.get("/blogs", getblog);
contentrouter.get("/totalblog", getnumberofblogs);
contentrouter.get("/blogs/:blogslug", getBlogBySlug);
contentrouter.get("/notes", getnotes); 
contentrouter.get("/totalnotes", getnumberofnotes); 
contentrouter.get("/notes/:id", downloadnotes);
contentrouter.get("/projects", getprojectlist); 
contentrouter.get("/projects/:slug", projectbyslug);
contentrouter.post("/postblog", postblog);
contentrouter.post("/postnote",
    uploadpdf.single("file"),
    postnotes);
module.exports = contentrouter;
