const multer = require("multer");
const path = require("path");
const fs = require("fs");

const notesDir = path.join(__dirname, "../Public/notes");
console.log(notesDir)

if (!fs.existsSync(notesDir)) {
  fs.mkdirSync(notesDir, { recursive: true });
console.log("directory nhi mili")
}

// storage config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, notesDir);
  },
  filename: function (req, file, cb) {
    const uniqueName =
      Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueName + path.extname(file.originalname));
  },
});

// only pdf allowed
const fileFilter = (req, file, cb) => {
  if (file.mimetype === "application/pdf") {
    cb(null, true);
  } else {
    cb(new Error("Only PDF files allowed"), false);
  }
};

const filehandler = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 50 * 1024 * 1024, // 10MB
  },
});

module.exports = filehandler;
