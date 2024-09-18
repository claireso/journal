import path from 'path'
import { ulid } from 'ulid'
import { Jimp } from 'jimp'

const DEFAULT_DIRECTORY = path.resolve('uploads')
const DEFAULT_QUALITY = 70

interface Options {
  directory?: string
  quality?: number
}

const uploadFile = async (file: File, options: Options = {}) => {
  const { directory = DEFAULT_DIRECTORY, quality = DEFAULT_QUALITY } = options

  if (!file) {
    throw new Error('File is required')
  }

  const extension = path.extname(file.name)
  const filename = `${ulid().toLowerCase()}${extension}`
  const filepath = `${directory}/${filename}`

  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)

  const photo = await Jimp.fromBuffer(buffer)
  // @ts-ignore
  await photo.write(filepath, { quality })

  return {
    filename: filename,
    width: photo.bitmap.width,
    height: photo.bitmap.height
  }
}

export default uploadFile
