require("dotenv").config();
const express = require("express");
const path = require("path");
const fs = require("fs");
const cors = require("cors");
const clientPromise = require("./src/lib/mongodb.js");
const contentrouter = require("./src/Routes/contentwebandapp.js");
const myhadithrouter = require("./src/Routes/myhadith.js");
const commonrouter = require("./src/Routes/common.js");
const Commercerouter = require("./src/Routes/commerce.js");

const app = express();
app.use(cors());
app.use(express.json());

app.use(
  express.static(path.join(__dirname, "src/Public"))
);

// app.use(
//   "/downloads",
//   express.static(path.join(process.cwd(), "src", "temp"))
// );

app.get("/downloads/:filename", (req, res) => {
  const filePath = path.join(
    process.cwd(),
    "src",
    "temp",
    req.params.filename
  );

  if (!fs.existsSync(filePath)) {
    return res.status(404).json({
      success: false,
      message: "File not found",
    });
  }

  res.download(filePath, req.params.filename, err => {
    if (err) {
      console.error("Download Error:", err);
      return;
    }

    fs.unlink(filePath, unlinkErr => {
      if (unlinkErr) {
        console.error("Delete Error:", unlinkErr);
      } else {
        console.log("Deleted:", req.params.filename);
      }
    });
  });
});

console.log("server pe request giri sir !")
app.get("/", (req, res) => {
  res.send("Backend running ✅");
});


app.use("/api/content", contentrouter);
app.use("/api/connectus", commonrouter);
app.use("/api/hadith", myhadithrouter);
app.use("/api/products", Commercerouter);

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
