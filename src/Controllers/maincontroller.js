require("dotenv").config();
const clientPromise = require("../lib/mongodb");


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

    const blog = await db.collection("blogs").findOne({ slug: blogslug });

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
    const client = await clientPromise;
    const db = client.db("developerzaid");

    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0];
    const randomNumber = Math.floor(Math.random() * 10);

    if (!req.body.verifypass || req.body.verifypass !== process.env.VERIFY_PASS) {
      res.status(502).json({ error: "password doesn't match" })
      console.log("mila hua pass:", req.body.verifypass, "env eala pass:",process.env.VERIFY_PASS )
    }
    else {
      const blogcontent = {
        "id": randomNumber,
        "title": req.body.title,
        "slug": req.body.slug,
        "date": formattedDate,
        "description": req.body.description,
        "content": req.body.content,
        "para1": req.body.para1,
        "para2": req.body.para2

      }
      const result = await db.collection("blogs").insertOne(blogcontent);
      res.json({ success: true, result });
    }


  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const postnotes = async (req, res) => {
  try {
    const client = await clientPromise;
    const db = client.db("developerzaid");

    if (!req.body.verifypass || req.body.verifypass != process.env.VERIFY_PASS) {
      res.status(502).json({ error: "password doesn't match" })
    }
    else {
      const notescontent = {

        "id": req.body.id,
        "title": req.body.title,
        "file": req.body.file,
        "category": req.body.category

      }
      const result = await db.collection("notes").insertOne(notescontent);
      res.json({ success: true, result });
    }


  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


const getnotes = async (req, res) => {
  try {
    const client = await clientPromise;
    const db = client.db("developerzaid");
    const notes = await db.collection("notes").find().toArray();
    res.json(notes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}


module.exports = {
  getblog,
  getnotes,
  getBlogBySlug,
  postblog,
  postnotes
};