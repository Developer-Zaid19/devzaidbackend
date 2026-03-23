require("dotenv").config();
const clientPromise = require("../lib/mongodb");


const Contactform = async (req, res) => {
  try {
    if (!req.body.verifypass || req.body.verifypass !== process.env.VERIFY_PASS) {
      return res.status(502).json({ error: "SOME THING WENT WRONG" })
    }
    const client = await clientPromise;
    const db = client.db("developerzaid");
    const today = new Date();
    const formattedDate = today.toISOString().split("T")[0];

      const info = {
        type: req.body.type,
        date: formattedDate,
        name: req.body.name,
        contactdetails: req.body.email,
        message: req.body.message
      }
      console.log("data aya hai")
      console.log(info)
      const result = await db.collection("ContactForms").insertOne(info);
      res.json({ success: true, result });


  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const fetchclients = async (req, res) => {
  try {
    // verify password
    if (!req.body.verifypass || req.body.verifypass !== process.env.VERIFY_PASS) {
      return res.status(401).json({ error: "Unauthorized ❌" });
    }

    const client = await clientPromise;
    const db = client.db("developerzaid"); // check space here

    const fclient = await db
      .collection("ContactForms")
      .find()
      .sort({ _id: -1 })
      .toArray();

    res.json({
      success: true,
      count: fclient.length,
      data: fclient
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
fetchclients,
Contactform
};