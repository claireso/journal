import fs from 'fs'
import os from 'os'
import path from 'path'
import crypto from 'crypto'
import Jimp from 'jimp'

class CustomDiskStorage {
  static getDestination = (req, file, cb) => cb(null, os.tmpdir())

  static getFilename = (req, file, cb) => {
    crypto.pseudoRandomBytes(16, function (err, raw) {
      cb(err, err ? undefined : raw.toString('hex'))
    })
  }

  constructor(opts) {
    this.getDestination = opts.destination || CustomDiskStorage.getDestination
    this.getFilename = opts.filename || CustomDiskStorage.getFilename
    this.optmizations = opts.optimizations || {}
  }

  _handleFile = (req, file, cb) => {
    const optimizations = this.optmizations

    this.getDestination(req, file, (err, destination) => {
      if (err) return cb(err)

      this.getFilename(req, file, (err, filename) => {
        if (err) return cb(err)

        const finalPath = path.join(destination, filename)
        const outStream = fs.createWriteStream(finalPath)

        file.stream.pipe(outStream)
        outStream.on('error', cb)
        outStream.on('finish', async () => {
          try {
            const photo = await Jimp.read(finalPath)

            if (optimizations.quality) {
              await photo.quality(optimizations.quality)
              await photo.write(finalPath)
            }

            cb(null, {
              destination: destination,
              filename: filename,
              path: finalPath,
              size: outStream.bytesWritten,
              width: photo.bitmap.width,
              height: photo.bitmap.height
            })
          } catch (err) {
            cb(err)
          }
        })
      })
    })
  }

  _removeFile = (req, file, cb) => {
    const filePath = file.path

    delete file.destination
    delete file.filename
    delete file.path

    fs.unlink(filePath, cb)
  }
}

export default (opts) => new CustomDiskStorage(opts)
