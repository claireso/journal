import request from './requester'

const fetch = async (url, params = {}) => {
  const response = await request(url, {baseURL: '/api', ...params})
  return response
}

const get = fetch

const post = async (url, params = {}) => {
  const response = await fetch(url, {method: 'post', ...params})
  return response
}

export default {
  get,
  post,
}