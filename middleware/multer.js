const multer = require('multer'); 

const upload = multer({
  storage: multer.diskStorage({
    destination: function(req,file,cb){
      cb(null, "./image/")
    },
    filename: function(req,file,cb){
      // console.log(file)
      cb(null,""+file.originalname)
    }
  })
}).single("img")

module.exports = upload;