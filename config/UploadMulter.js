const multer = require('multer');

const storage = multer.diskStorage({
    destination:function(req,file,cb) {
        if(req.body.fileType == "image"){
            cb(null,"./files/image")
        }else if(req.body.fileType == "video"){
            cb(null,"./files/video")
        }else if(req.body.fileType == "text"){
            cb(null,"./files/text")
        }
        
    },
    filename:function(req,file,cb){
        cb(null,Date.now() + "-" + file.originalname)
    }
})

const file = multer({
    storage:storage
});

module.exports = file;