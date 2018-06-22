import request from './requester'

const fetch = async (url, params = {}) => {
  const response = await request(url, {baseURL: '/api', ...params})
  return response
}

const get = fetch

export default {
  get,
}