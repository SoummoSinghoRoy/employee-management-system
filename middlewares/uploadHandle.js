const multer = require('multer');
const path = require('path');

const employeePicStorage = picStorage('public/uploads/a_organization')
const employeePicExpectSize = 1024 * 500

function picStorage (uploadLocation) {
  return multer.diskStorage({
          destination: (req, file, cb) => {
            cb(null, uploadLocation)
          },
          filename: (req, file, cb) => {
            cb(null, file.fieldname + '-' + Date.now() + '-' + file.originalname)
          }
        })
}

function picUpload (storage, filesize) {
  return multer({
      storage,
      limits: {
        fileSize: filesize
      },
      fileFilter: (req, file, cb) => {
        const imgType = /jpeg|jpg|png/
        const extName = imgType.test(path.extname(file.originalname).toLowerCase())
        const mimeType = imgType.test(file.mimetype)
    
        if(extName && mimeType) {
          cb(null, true)
        } else {
          cb(new Error('Only accept images & types: jpeg, jpg or png'))
        }
      }
    })
}

exports.employeePicUpload = picUpload(employeePicStorage, employeePicExpectSize);