const {uploadFiles} = require('../controllers/UploadController');
const express = require('express');
const router = express.Router();

router.post('/fileUpload',uploadFiles);

module.exports = router;