const multer = require('multer');

const storage = multer.diskStorage({
   destination: './public/img/movies',
   filename: (req, file, callb) => {
      const uniqueName = `${Date.now()}-${file.originalname}`;
      callb(null, uniqueName);
   }
})

const upload = multer({ storage });

module.exports = upload;