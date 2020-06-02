const create = (file) =>
  new Promise((resolve) => {
    const reader = new FileReader()

    reader.addEventListener('load', () => {
      resolve(reader.result)
    })

    reader.readAsDataURL(file)
  })

export default create
