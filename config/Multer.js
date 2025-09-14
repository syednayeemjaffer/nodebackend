const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (req.body.role == "ADMIN") {
      cb(null, "./img/admin/");
    } else {
      cb(null, "./img/user");
    }
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

module.exports = storage;
