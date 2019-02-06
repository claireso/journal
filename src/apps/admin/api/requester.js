import axios from 'axios'

const DEFAULT_PARAMS = {
  method: 'get'
}

const request = (url, params = DEFAULT_PARAMS) => {
  return axios({
    url: url,
    ...params
  })
}

export default request
