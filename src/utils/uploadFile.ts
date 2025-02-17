import path from 'path'
import { ulid } from 'ulid'
import sharp from 'sharp'

const DEFAULT_DIRECTORY = path.resolve('uploads')
const DEFAULT_QUALITY = 80

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
  const filename = `sharp-${ulid().toLowerCase()}${extension}`
  const filepath = `${directory}/${filename}`

  const buffer = await file.arrayBuffer()

  const imageMetada = await sharp(buffer).metadata()

  await sharp(buffer)
    .jpeg({
      quality
    })
    .toFile(filepath)

  return {
    filename: filename,
    width: imageMetada.width as number,
    height: imageMetada.height as number
  }
}

export default uploadFile
