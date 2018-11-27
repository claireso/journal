import multer from 'multer'
import { ulid } from 'ulid'
import path from 'path'

import { ALLOWED_MIMETYPES } from '@common/constants'
import customDiskStorage from '@server/utils/multer/customDiskStorage'

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

export default multer({
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
