const generatePhotos = () => {
  const photos = new Array(50).fill({}).map((p, index) => ({
    title: `Photo ${index + 1}`,
    description: `Description ${index + 1}`,
    name: '01d685c6bh65q0cby3dmpgr79p.jpg',
    position: 'left',
    portrait: false,
    square: false
  }))

  return photos
}

const generateSubscriptions = () => {
  const subscriptions = new Array(50).fill({}).map(() => ({
    endpoint: 'https://db5p.notify.windows.com/w/?token=mdlgkmdlkg'
  }))

  return subscriptions
}

module.exports = {
  photos: generatePhotos(),
  subscriptions: generateSubscriptions()
}
