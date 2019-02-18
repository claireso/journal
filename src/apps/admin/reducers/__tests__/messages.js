import * as actionTypes from '../../actions/messages'
import messagesReducer from '../messages'

describe('reducer messages', () => {
  let reducer

  test('should add message', () => {
    const action = {
      type: actionTypes.ADD_MESSAGE,
      status: 'error',
      message: 'Message 1'
    }

    reducer = messagesReducer(reducer, action)

    expect(reducer).toEqual([{
      status: 'error',
      message: 'Message 1',
      type: 'ADD_MESSAGE'
    }])
  })

  test('should add a second message', () => {
    const action = {
      type: actionTypes.ADD_MESSAGE,
      status: 'success',
      key: 'crudPhoto',
      message: 'Message 2'
    }

    reducer = messagesReducer(reducer, action)

    expect(reducer).toEqual([
      {
        message: 'Message 1',
        status: 'error',
        'type': 'ADD_MESSAGE'
      },
      {
        key: 'crudPhoto',
        type: 'ADD_MESSAGE',
        status: 'success',
        message: 'Message 2'
      }
    ])
  })

  test('should add a third message', () => {
    const action = {
      type: actionTypes.ADD_MESSAGE,
      status: 'success',
      key: 'crudSubscription',
      message: 'Message 3'
    }

    reducer = messagesReducer(reducer, action)

    expect(reducer).toEqual([
      {
        message: 'Message 1',
        status: 'error',
        'type': 'ADD_MESSAGE'
      },
      {
        key: 'crudPhoto',
        type: 'ADD_MESSAGE',
        status: 'success',
        message: 'Message 2'
      },
      {
        type: 'ADD_MESSAGE',
        status: 'success',
        key: 'crudSubscription',
        message: 'Message 3'
      }
    ])
  })

  test('should edit second message', () => {
    const action = {
      type: actionTypes.ADD_MESSAGE,
      status: 'success',
      key: 'crudPhoto',
      message: 'Message 2 edit'
    }

    reducer = messagesReducer(reducer, action)

    expect(reducer).toEqual([
      {
        message: 'Message 1',
        status: 'error',
        'type': 'ADD_MESSAGE'
      },
      {
        key: 'crudPhoto',
        type: 'ADD_MESSAGE',
        status: 'success',
        message: 'Message 2 edit'
      },
      {
        type: 'ADD_MESSAGE',
        status: 'success',
        key: 'crudSubscription',
        message: 'Message 3'
      }
    ])
  })

  test('should delete second message', () => {
    const action = {
      type: actionTypes.CLOSE_MESSAGE,
      index: 1,
    }

    reducer = messagesReducer(reducer, action)

    expect(reducer).toEqual([
      {
        message: 'Message 1',
        status: 'error',
        'type': 'ADD_MESSAGE'
      },
      {
        type: 'ADD_MESSAGE',
        status: 'success',
        key: 'crudSubscription',
        message: 'Message 3'
      }
    ])
  })

  test('should delete first message', () => {
    const action = {
      type: actionTypes.CLOSE_MESSAGE,
      index: 0,
    }

    reducer = messagesReducer(reducer, action)

    expect(reducer).toEqual([
      {
        type: 'ADD_MESSAGE',
        status: 'success',
        key: 'crudSubscription',
        message: 'Message 3'
      }
    ])
  })

  test('should return internal error', () => {
    const action = {
      type: actionTypes.INTERNAL_SERVER_ERROR,
      status: 'error',
      message: 'An error has occured, please retry',
    }

    reducer = messagesReducer(reducer, action)

    expect(reducer).toEqual([
      {
        type: 'ADD_MESSAGE',
        status: 'success',
        key: 'crudSubscription',
        message: 'Message 3'
      },
      {
        type: 'INTERNAL_SERVER_ERROR',
        status: 'error',
        message: 'An error has occured, please retry'
      }
    ])
  })
})