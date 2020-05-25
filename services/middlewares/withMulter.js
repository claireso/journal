import multer from 'multer'
import { ulid } from 'ulid'
import path from 'path'

import customDiskStorage from './multer/customDiskStorage'

const ALLOWED_MIMETYPES = ['image/jpeg', 'image/png']

// multer storage configuration
const storage = customDiskStorage({
  destination(req, file, callback) {
    callback(null, path.resolve('public', 'img'))
  },
  filename(req, file, callback) {
    const fieldname = ulid().toLowerCase()
    const extension = path.extname(file.originalname)

    callback(null, `${fieldname}${extension}`)
  },
  optimizations: {
    quality: 70
  }
})

const upload = multer({
  storage: storage,
  fileFilter(req, file, callback) {
    if (ALLOWED_MIMETYPES.includes(file.mimetype)) {
      callback(null, true)
      return
    }

    // reject file
    callback(null, false)
  }
})

export default async (req, res, next) => {
  upload.single('file')(req, {}, (err) => {
    if (err) {
      res.status(500).send('')
      return
    }
    next()
  })
}
