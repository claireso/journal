import fetch from 'isomorphic-unfetch'

import logger from '@services/logger'

const DEFAULT_PARAMS = {}
const DEFAULT_OPTIONS = {
  method: 'GET'
}

const isFormData = (data) => data instanceof FormData

const formatBody = (body) => {
  if (isFormData(body)) {
    return body
  }

  return JSON.stringify(body)
}

export const buildRequester = ({ baseUrl, onError } = {}) => {
  const request = async (
    url,
    params = DEFAULT_PARAMS,
    options = DEFAULT_OPTIONS
  ) => {
    logger('call api =>', { url, params, options })

    const query = Object.keys(params)
      .map((key) => key + '=' + params[key])
      .join('&')
    const completeUrl = `${baseUrl}${url}${query ? '?' + query : ''}`

    if (options.body && !isFormData(options.body)) {
      options.headers = {
        'Content-Type': 'application/json'
      }
    }

    const response = await fetch(completeUrl, options)

    if (response.ok) {
      return await response.json()
    } else {
      const error = new Error(response.statusText)
      error.response = response

      if (onError) {
        const { status } = error.response

        if (status === 401 && onError.unAuthorized) {
          onError.unAuthorized()
        }

        if (status >= 500 && onError.internalServerError) {
          onError.internalServerError()
        }
      }

      return Promise.reject(error)
    }
  }

  const get = request

  const post = (url, body = {}) => {
    const method = 'POST'

    const _body = formatBody(body)

    return request(url, undefined, { method, body: _body })
  }

  const del = (url) => {
    const method = 'DELETE'
    return request(url, undefined, { method })
  }

  const patch = (url, body = {}) => {
    const method = 'PATCH'

    const _body = formatBody(body)

    return request(url, undefined, { method, body: _body })
  }

  return {
    get,
    post,
    del,
    patch
  }
}
