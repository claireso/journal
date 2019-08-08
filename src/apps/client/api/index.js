export const getPhotos = async page => {
  let url = '/api/photos'

  if (page !== undefined && page !== null) {
    url += `?page=${page}`
  }

  const response = await fetch(url)

  if (response.status === 200) {
    return await response.json()
  }

  throw new Error('Can not get photos')
}
