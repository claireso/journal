import logger from '@services/logger'

import ApiError from './ApiError'

type RequesterOptions = {
  baseUrl: string
  ApiError: ApiError
  onError: {
    unAuthorized?: () => void
    internalServerError?: () => void
  }
}

type RequestData = {} | FormData

/**
 * isFormData
 * @param {any} data
 */
const isFormData = (data: RequestData) => data instanceof FormData

/**
 * qs
 * Transform object into query string
 * input: {key: 'value', key2: 'value2'}
 * output: 'key=value&key2=value2'
 * @param {object} data
 */
const qs = (data: object) => {
  return Object.keys(data)
    .map((key) => key + '=' + data[key as keyof typeof data])
    .join('&')
}

/**
 * buildBody
 * @param {object | FormData} body
 * @return {FormData | string}
 */
const buildBody = (data: RequestData) => {
  if (isFormData(data)) {
    return data as FormData
  }

  return JSON.stringify(data)
}

export const buildRequester = ({ baseUrl, ApiError, onError }: RequesterOptions) => {
  /**
   * Request
   * @param {string} url
   * @param {object} data (query or body)
   * @param {object} options
   * @return {promise}
   */
  const request = async (endpoint: RequestInfo, options: RequestInit = {}) => {
    logger.info({
      event: 'callApi',
      endpoint,
      options
    })

    if (options.body && !isFormData(options.body)) {
      options.headers = {
        'Content-Type': 'application/json'
      }
    }

    const url = `${baseUrl}${endpoint}`

    const response = await fetch(url, options)

    if (response.ok) {
      return await response.json()
    } else {
      // @ts-ignore
      const error = new ApiError(response)

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

  // const abortableRequest = (url, data, options = DEFAULT_OPTIONS) => {
  //   const controller = typeof window !== 'undefined' ? new window.AbortController() : undefined

  //   return {
  //     abort: () => controller?.abort(),
  //     ready: request(url, data, { ...options, signal: controller?.signal })
  //   }
  // }

  const get = <T>(url: string, data = {}, config: RequestInit = {}): Promise<T> => {
    const query = qs(data)
    url = `${url}${query ? '?' + query : ''}`
    const init = { method: 'GET', ...config }
    return request(url, init)
  }

  const post = <T, U = void>(url: string, body?: U): Promise<T> => {
    const init = { method: 'POST', body: body ? buildBody(body) : '' }
    return request(url, init)
  }

  const del = <T>(url: string): Promise<T> => {
    const init = { method: 'DELETE' }
    return request(url, init)
  }

  const patch = <T, U extends FormData>(url: string, body: U): Promise<T> => {
    const init = { method: 'PATCH', body: buildBody(body) }
    return request(url, init)
  }

  return {
    get,
    post,
    del,
    patch
  }
}
