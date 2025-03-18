var multer = require('multer');
var path = require('path');
var storage = multer.diskStorage({
    destination : function(req,res, cb){
        cb(null,'files/')
    },
    filename: function (req, file, cb) {
        let ext = path.extname(file.originalname)
        cb(null,  'accusesData' +Date.now().toString() + ext)
    }

})

var upload = multer({
    storage:storage,
    fileFilter: function(req,file, cb){
        if (!file.originalname.match(/\.(xlsx|csv|pdf|doc|txt|jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
                req.fileValidationError = 'Only  files are allowed!';
                return cb(new Error('Only  files are allowed!'), false);
               
        }
            cb(null, true);
           
    }
    
});

module.exports = upload