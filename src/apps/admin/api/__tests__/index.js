import axios from 'axios'
import api from '../index'

jest.mock('axios')

describe('api', () => {
  test('should get data', () => {
    api.get('/users')

    expect(axios).toHaveBeenNthCalledWith(1, {
      url: '/users',
      baseURL: '/api'
    })
  })

  test('should post data', () => {
    api.post('/users', { data: { username: 'jane' } })

    expect(axios).toHaveBeenNthCalledWith(2, {
      url: '/users',
      baseURL: '/api',
      method: 'post',
      data: {
        username: 'jane'
      }
    })
  })

  test('should patch data', () => {
    api.patch('/users/1', { data: { username: 'jane' } })

    expect(axios).toHaveBeenNthCalledWith(3, {
      url: '/users/1',
      baseURL: '/api',
      method: 'patch',
      data: {
        username: 'jane'
      }
    })
  })

  test('should delete data', () => {
    api.del('/users/1')

    expect(axios).toHaveBeenNthCalledWith(4, {
      url: '/users/1',
      baseURL: '/api',
      method: 'delete'
    })
  })
})