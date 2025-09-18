const FeedModel = require("../models/FeedModel");
const uploadMulter = require("../config/UploadMulter");

exports.uploadFiles = (req, res) => {
  const upload = uploadMulter.single("file");

  upload(req, res, (err) => {
    if (err) {
      return res.status(400).json({
        status: false,
        message: "Something went wrong during upload",
        error: err.message,
      });
    }
    const {userId , fileType , fileDescription} = req.body;

    const newFile = new FeedModel({
      userId: userId,
      filePath: req.file.filename,
      fileType: fileType,
      fileDescription: fileDescription
        ? fileDescription
        : null,
    });

    newFile
      .save()
      .then((output) => {
        if (output) {
          return res.status(200).json({
            success: true,
            message: "File is uploaded..",
            fileDetail: newFile,
          });
        }
        return res
          .status(400)
          .json({ success: false, message: "File is not uploaded" });
      })
      .catch((err) => {
        return res
          .status(500)
          .json({
            success: false,
            message: "server error",
            error: err.message,
          });
      });
  });
};
