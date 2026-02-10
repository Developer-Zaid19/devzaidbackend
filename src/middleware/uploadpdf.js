const multer = require("multer");

// memory storage (VERY IMPORTANT)
const storage = multer.memoryStorage();

// sirf PDF allow
const fileFilter = (req, file, cb) => {
  if (file.mimetype === "application/pdf") {
    cb(null, true);
  } else {
    cb(new Error("Only PDF files are allowed"), false);
  }
};

// 10MB limit (adjust kar sakte ho)
const uploadPdf = multer({
  storage: storage,
  limits: {
    fileSize: 50 * 1024 * 1024, // 10MB
  },
  fileFilter: fileFilter,
});

module.exports = uploadPdf;
