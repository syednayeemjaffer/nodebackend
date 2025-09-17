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
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  const type = ['png','jpg','svg'];
  const ext = file.originalname.split('.')[1];
  console.log(ext);
  if (type.includes(ext)) {
    cb(null, true);
  } else {
    
    cb(new Error("IMG_TYPE_ERROR"));
  }
};

const img = multer({
  storage: storage,
  limits: { fileSize: 3 * 1024 * 1024 },
  fileFilter: fileFilter,
});

module.exports = img; 