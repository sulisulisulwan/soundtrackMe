const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'client/public/uploads');
  },
  filename: (req, file, cb) => {
    const { originalname } = file;
    let splitFileName = originalname.split('.')
    let suffix = splitFileName[splitFileName.length - 1]
    let newFileName = idTransfer + '.' + suffix
    cb(null, newFileName)
  }
})

const upload = multer({ storage: storage})