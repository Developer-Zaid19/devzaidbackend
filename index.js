require("dotenv").config();
const express = require("express");
const path = require("path");
const cors =  require("cors");
const clientPromise = require("./src/lib/mongodb.js");
const router = require("./src/Routes/mainroute.js");

const app = express();
app.use(cors());
app.use(express.json());

app.use(
  "/Public",
  express.static(path.join(__dirname, "Public"))
);

app.get("/", (req, res) => {
  res.send("Backend running ✅");
});


app.use("/api/content", router);

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
