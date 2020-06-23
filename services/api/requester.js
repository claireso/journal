import logger from '@services/logger'

const DEFAULT_OPTIONS = {
  method: 'GET'
}

/**
 * isFormData
 * @param {any} data
 */
const isFormData = (data) => data instanceof FormData

/**
 * buildQuery
 * Transform object into query string
 * input: {key: 'value', key2: 'value2'}
 * output: 'key=value&key2=value2'
 * @param {object} data
 */
const buildQuery = (data) => {
  return Object.keys(data)
    .map((key) => key + '=' + data[key])
    .join('&')
}

/**
 * buildBody
 * @param {object | FormData} body
 * @return {object | string}
 */
const buildBody = (data) => {
  if (isFormData(data)) {
    return data
  }

  return JSON.stringify(data)
}

export const buildRequester = ({ baseUrl, onError } = {}) => {
  /**
   * Request
   * @param {string} url
   * @param {object} data (query or body)
   * @param {object} options
   * @return {promise}
   */
  const request = async (url, data, options = DEFAULT_OPTIONS) => {
    logger('call api =>', { url, data, options })

    let query = undefined
    let body = undefined

    if (['POST', 'PATCH'].includes(options.method)) {
      body = data && buildBody(data)
    } else {
      query = data && buildQuery(data)
    }

    const completeUrl = `${baseUrl}${url}${query ? '?' + query : ''}`

    if (body) {
      options.body = body

      if (!isFormData(body)) {
        options.headers = {
          'Content-Type': 'application/json'
        }
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

  const abortableRequest = (url, data, options = DEFAULT_OPTIONS) => {
    const controller =
      typeof window !== 'undefined' ? new window.AbortController() : undefined

    return {
      abort: () => controller?.abort(),
      ready: request(url, data, { ...options, signal: controller?.signal })
    }
  }

  const get = abortableRequest

  const post = (url, body = {}) => {
    const method = 'POST'

    return abortableRequest(url, body, { method })
  }

  const del = (url) => {
    const method = 'DELETE'

    return abortableRequest(url, undefined, { method })
  }

  const patch = (url, body = {}) => {
    const method = 'PATCH'

    return abortableRequest(url, body, { method })
  }

  return {
    get,
    post,
    del,
    patch
  }
}
