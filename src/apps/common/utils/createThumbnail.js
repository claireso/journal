const createThumbnail = file =>
  new Promise(resolve => {
    const reader = new FileReader()

    reader.addEventListener('load', () => {
      resolve(reader.result)
    })

    reader.readAsDataURL(file)
  })

export default createThumbnail
