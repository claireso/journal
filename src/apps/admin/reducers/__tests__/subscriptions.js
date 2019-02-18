import * as actionTypes from '../../actions/subscriptions'
import subscriptionsReducer from '../subscriptions'

describe('reducer subscriptions', () => {
  let reducer

  test('should start request subscriptions', () => {
    const action = {
      type: actionTypes.LOAD_SUBSCRIPTIONS_REQUEST,
    }

    reducer = subscriptionsReducer(reducer, action)

    expect(reducer).toEqual({
      items: [],
      pager: null,
      isLoading: true,
      isProcessing: false
    })
  })

  test('should load subscriptions', () => {
    const action = {
      type: actionTypes.LOAD_SUBSCRIPTIONS_SUCCESS,
      response: __SUBSCRIPTIONS__
    }

    reducer = subscriptionsReducer(reducer, action)

    expect(reducer).toEqual({
      "items": [
        {
          "id": 118,
          "subscription": {
            "endpoint": "https://fcm.googleapis.com/",
            "expirationTime": null,
            "keys": {
              "p256dh": "BH_v",
              "auth": "nijX1"
            }
          },
          "created_at": "2019-02-05T15:41:23.646Z",
          "updated_at": "2019-02-05T15:41:23.646Z"
        }
      ],
      "pager": {
        "count": 10,
        "totalPages": 1,
        "limit": 10,
        "offset": 0
      },
      isLoading: false,
      isProcessing: false
    })
  })

  test('should start delete subscription', () => {
    const action = {
      type: actionTypes.DELETE_SUBSCRIPTION_REQUEST
    }

    reducer = subscriptionsReducer(reducer, action)

    expect(reducer).toEqual({
      "items": [
        {
          "id": 118,
          "subscription": {
            "endpoint": "https://fcm.googleapis.com/",
            "expirationTime": null,
            "keys": {
              "p256dh": "BH_v",
              "auth": "nijX1"
            }
          },
          "created_at": "2019-02-05T15:41:23.646Z",
          "updated_at": "2019-02-05T15:41:23.646Z"
        }
      ],
      "pager": {
        "count": 10,
        "totalPages": 1,
        "limit": 10,
        "offset": 0
      },
      isLoading: false,
      isProcessing: true
    })
  })

  test('should not delete subscription', () => {
    const action = {
      type: actionTypes.DELETE_SUBSCRIPTION_ERROR
    }

    reducer = subscriptionsReducer(reducer, action)

    expect(reducer).toEqual({
      "items": [
        {
          "id": 118,
          "subscription": {
            "endpoint": "https://fcm.googleapis.com/",
            "expirationTime": null,
            "keys": {
              "p256dh": "BH_v",
              "auth": "nijX1"
            }
          },
          "created_at": "2019-02-05T15:41:23.646Z",
          "updated_at": "2019-02-05T15:41:23.646Z"
        }
      ],
      "pager": {
        "count": 10,
        "totalPages": 1,
        "limit": 10,
        "offset": 0
      },
      isLoading: false,
      isProcessing: false
    })
  })

  test('should delete subscription', () => {
    const action = {
      type: actionTypes.DELETE_SUBSCRIPTION_SUCCESS,
      id: 118
    }

    reducer = subscriptionsReducer(reducer, action)

    expect(reducer).toEqual({
      "items": [
      ],
      "pager": {
        "count": 9,
        "totalPages": 1,
        "limit": 10,
        "offset": 0
      },
      isLoading: false,
      isProcessing: false
    })
  })
})