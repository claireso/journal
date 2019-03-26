import notifications from '../notifications'

describe('notifications', () => {
  beforeEach(() => {
    fetch.resetMocks()
  })

  afterEach(() => {
    // reset permission
    global.setNotificationPermission()
    // reset service worker
    global.setServiceWorker()
  })

  test('should be default', () => {
    global.setNotificationPermission()

    expect(notifications.areDefault()).toBeTruthy()
  })

  test('should be denied', () => {
    global.setNotificationPermission('denied')

    expect(notifications.areDenied()).toBeTruthy()
  })

  test('should be granted', () => {
    global.setNotificationPermission('granted')

    expect(notifications.areGranted()).toBeTruthy()
  })

  test('should get public key', async () => {
    const response = global.__NOTIFICATIONS_PUBLIC_KEY__
    fetch.mockResponseOnce(response)

    await expect(notifications.getPushPublicKey()).resolves.toEqual(response)
  })

  test('should throw error on get public key', async () => {
    fetch.mockReject(new Error())

    await expect(notifications.getPushPublicKey()).rejects.toThrowError(
      'Notifications: can not get public key'
    )
  })

  test('should get registration', async () => {
    const result = await notifications.getRegistration()

    expect(result).toBeInstanceOf(Object)
  })

  test('should throw error on get registration', async () => {
    global.setServiceWorker({
      ready: Promise.reject()
    })

    await expect(notifications.getRegistration()).rejects.toThrowError(
      'Notifications: can not get registration'
    )
  })

  test('should subscribe', async () => {
    const { subscribe } = global.setServiceWorker({
      subscribe: jest.fn()
    })

    fetch.mockResponses(
      [global.__NOTIFICATIONS_PUBLIC_KEY__, { status: 200 }],
      ['', { status: 200 }]
    )

    await notifications.subscribe()

    expect(fetch).toHaveBeenCalledTimes(2)
    expect(subscribe).toHaveBeenCalledTimes(1)
    expect(subscribe).toHaveBeenCalledWith({
      userVisibleOnly: true,
      applicationServerKey: expect.any(Uint8Array)
    })
  })

  test('should not subscribe when no public key', async () => {
    const { subscribe } = global.setServiceWorker({
      subscribe: jest.fn()
    })

    fetch.mockResponses(['', { status: 200 }], ['', { status: 200 }])

    await notifications.subscribe()

    expect(fetch).toHaveBeenCalledTimes(1)
    expect(subscribe).toHaveBeenCalledTimes(0)
  })

  test('should get subscription', async () => {
    const { getSubscription } = global.setServiceWorker()
    const result = await notifications.getSubscription()

    expect(result).toEqual({})
    expect(getSubscription).toHaveBeenCalledTimes(1)
  })

  test('should throw error on get subscription', async () => {
    global.setServiceWorker({
      getSubscription: jest.fn().mockImplementation(() => Promise.reject({}))
    })

    await expect(notifications.getSubscription()).rejects.toThrowError(
      'Notifications: can not get subscription'
    )
  })
})
