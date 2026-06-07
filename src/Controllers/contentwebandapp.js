require("dotenv").config();
const clientPromise = require("../lib/mongodb");
const supabase = require("../lib/supabase");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const notes = require("../data/Content/data")
const projects = require("../data/Content/data")
const projectslug = require("../data/Content/project.json")


const getblog = async (req, res) => {
  try {
    console.log("request giri bhaya");
    const client = await clientPromise;
    const db = client.db("developerzaid");
    const blogs = await db.collection("blogs").find().toArray();
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

const getBlogBySlug = async (req, res) => {
  try {
    const { blogslug } = req.params;
    const client = await clientPromise;
    const db = client.db("developerzaid");

    const blog = await db.collection("blogs").findOne({ id: blogslug });

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res.json(blog);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const postblog = async (req, res) => {
  try {
    if (!req.body.verifypass || req.body.verifypass !== process.env.VERIFY_PASS) {
      return res.status(502).json({ error: "SOME THING WENT WRONG" })
    }
    const client = await clientPromise;
    const db = client.db("developerzaid");
    const today = new Date();
    const formattedDate = today.toISOString().split("T")[0];
    const hh = String(today.getHours()).padStart(2, '0');
    const mm = String(today.getMinutes()).padStart(2, '0');
    const ss = String(today.getSeconds()).padStart(2, '0');

    const slug =
      req.body.title.replaceAll(" ", "-").toLowerCase() + "-" + formattedDate + "-" + hh + mm + ss;

      const blogcontent = {
        "id": slug,
        "title": req.body.title,
        "date": formattedDate,
        "description": req.body.description,
        "content": req.body.content,
        "para1": req.body.para1,
        "para2": req.body.para2

      }
      const result = await db.collection("blogs").insertOne(blogcontent);
      res.json({ success: true, result });


  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const postnotes = async (req, res) => {
  try {
    if (!req.body.verifypass || req.body.verifypass !== process.env.VERIFY_PASS) {
      return res.status(401).json({ error: "Servent Went Wrong" });
    }

    if (!req.file) {
      return res.status(400).json({ error: "PDF file is required" });
    }
    const today = new Date();
    const formattedDate = today.toISOString().split("T")[0];
    const hh = String(today.getHours()).padStart(2, '0');
    const mm = String(today.getMinutes()).padStart(2, '0');
    const ss = String(today.getSeconds()).padStart(2, '0');

    const slug =
      req.body.title.replaceAll(" ", "-").toLowerCase() + "-" + formattedDate + "-" + hh + mm + ss;

    const filePath = `notes/${slug}.pdf`;

    const { error: uploadError } = await supabase.storage
      .from("pdfs") // bucket name
      .upload(filePath, req.file.buffer, {
        contentType: "application/pdf",
        upsert: false,
      });

    if (uploadError) {
      return res.status(500).json({ error: uploadError.message });
    }

    const client = await clientPromise;
    const db = client.db("developerzaid");

    const notescontent = {
      id: slug,
      title: req.body.title,
      file: filePath, 
      category: req.body.category,
      date: formattedDate,
    };

    const result = await db.collection("notes").insertOne(notescontent);

    res.json({
      success: true,
      message: "doc uploaded successfully",
      result,
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

const getnotes = async (req, res) => {
  try {
    console.log("kisi ne notes ki list mangi hai")
    res.json(notes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}


const downloadnotes = async (req, res) => {
  try {
    const noteId = req.params.id;
    const note = await notes.findOne({ url: noteId });

    if (!note) {
      return res.status(404).json({ error: "Notes not found" });
    }
    res.send(buffer);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};


const getprojectlist = async (req, res) => {
  try {
    console.log("kisi ne projects ki list mangi hai")
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const projectbyslug = async (req, res) => {
  try {
    const { slug } = req.params;
    const projects = projectslug
    const projectjson = await projects.find((item) => item.slug === slug)

    console.log("kisi ne projects ka slug bheja hai")
    if (!projectjson) {
      return res.status(404).json({ message: "Project not found" });
    }
    res.json(projectjson);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


module.exports = {
  getblog,
  getnotes,
  getBlogBySlug,
  postblog,
  postnotes,
  downloadnotes,
  getprojectlist,
  projectbyslug
};