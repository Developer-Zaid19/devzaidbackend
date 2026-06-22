const express = require("express");
const { getblog, getnotes, postblog, getBlogBySlug, postnotes, downloadnotes, getprojectlist, updateBlog, projectbyslug, deleteBlog, getnumberofnotes, getnumberofblogs } = require("../Controllers/contentwebandapp.js");
const uploadpdf = require("../middleware/uploadpdf.js")

const contentrouter = express.Router();

contentrouter.get("/blogs", getblog);
contentrouter.get("/totalblog", getnumberofblogs);
contentrouter.get("/blogs/:blogslug", getBlogBySlug);
contentrouter.delete("/deleteblog/:blogslug", deleteBlog);
contentrouter.put("/updateblog/:id", updateBlog)
contentrouter.post("/postblog", postblog);
contentrouter.get("/notes", getnotes); 
contentrouter.get("/totalnotes", getnumberofnotes); 
contentrouter.get("/notes/:id", downloadnotes);
contentrouter.get("/projects", getprojectlist); 
contentrouter.get("/projects/:slug", projectbyslug);
contentrouter.post("/postnote",
    uploadpdf.single("file"),
    postnotes);
module.exports = contentrouter;
