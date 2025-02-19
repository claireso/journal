import path from 'path'
import { ulid } from 'ulid'
import sharp, { type Metadata, type OutputInfo } from 'sharp'

const DEFAULT_DIRECTORY = path.resolve('uploads')
const DEFAULT_QUALITY = 80
const DEFAULT_LANDSCAPE_WIDTH = 1640
const DEFAULT_PORTRAIT_WIDTH = 800

interface Options {
  directory?: string
  quality?: number
  size?: {
    landscape?: number
    portrait?: number
  }
}

const uploadFile = async (file: File, options: Options = {}) => {
  const {
    directory = DEFAULT_DIRECTORY,
    quality = DEFAULT_QUALITY,
    size = { landscape: DEFAULT_LANDSCAPE_WIDTH, portrait: DEFAULT_PORTRAIT_WIDTH }
  } = options

  if (!file) {
    throw new Error('File is required')
  }

  const extension = path.extname(file.name)
  const filename = `sharp-${ulid().toLowerCase()}${extension}`
  const filepath = `${directory}/${filename}`

  const buffer = await file.arrayBuffer()

  let imageMetada: Metadata | OutputInfo = await sharp(buffer).metadata()
  const width =
    !!imageMetada.width && !!imageMetada.height && imageMetada.width > imageMetada.height
      ? size.landscape
      : size.portrait

  imageMetada = await sharp(buffer)
    .resize({
      width: width ?? size.landscape,
      withoutEnlargement: true
    })
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
