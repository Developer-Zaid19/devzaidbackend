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


module.exports = Contactform;