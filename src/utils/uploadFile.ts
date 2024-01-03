import path from 'path'
import { writeFile } from 'fs/promises'
import { ulid } from 'ulid'
import Jimp from 'jimp'

const DEFAULT_ALLOWED_MIMETYPES = ['image/jpeg', 'image/png']
const DEFAULT_DIRECTORY = path.resolve('uploads')
const DEFAULT_QUALITY = 70

interface Options {
  directory?: string
  quality?: number
  allowedMimetypes?: string[]
}

const uploadFile = async (file: File, options: Options = {}) => {
  const {
    directory = DEFAULT_DIRECTORY,
    quality = DEFAULT_QUALITY,
    allowedMimetypes = DEFAULT_ALLOWED_MIMETYPES
  } = options

  if (!file || !allowedMimetypes.includes(file.type)) {
    throw new Error('uploadFile: file is required and must be allowed')
  }

  const extension = path.extname(file.name)
  const filename = `${ulid().toLowerCase()}${extension}`
  const filepath = `${directory}/${filename}`

  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)

  // store file in the directory
  await writeFile(filepath, buffer)

  // optimize file and get metadata (width + height)
  const photo = await Jimp.read(filepath)
  await photo.quality(quality)
  await photo.write(filepath)

  return {
    filename: filename,
    width: photo.bitmap.width,
    height: photo.bitmap.height
  }
}

export default uploadFile
