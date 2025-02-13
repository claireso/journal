const arrayBufferToUrlBase64 = (buffer: ArrayBuffer): string => {
  // convert ArrayBuffer to standard base64
  const base64 = Buffer.from(buffer).toString('base64')

  // Replace characters to make URL encoding safe
  const urlBase64 = base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')

  return urlBase64
}

export default arrayBufferToUrlBase64
