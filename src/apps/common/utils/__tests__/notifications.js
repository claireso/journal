import notifications from '../notifications'

describe('notifications', () => {
  beforeEach(() => {
    fetch.resetMocks()
  })

  afterEach(() => {
    // reset permission
    setNotificationPermission()
    // reset service worker
    setServiceWorker()
  })

  test('should be default', () => {
    setNotificationPermission()

    expect(notifications.areDefault()).toBeTruthy()
  })

  test('should be denied', () => {
    setNotificationPermission('denied')

    expect(notifications.areDenied()).toBeTruthy()
  })

  test('should be granted', () => {
    setNotificationPermission('granted')

    expect(notifications.areGranted()).toBeTruthy()
  })

  test('should get public key', async () => {
    const response = __NOTIFICATIONS_PUBLIC_KEY__
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
    setServiceWorker({
      ready: Promise.reject()
    })

    await expect(notifications.getRegistration()).rejects.toThrowError(
      'Notifications: can not get registration'
    )
  })

  test('should subscribe', async () => {
    const { subscribe } = setServiceWorker({
      subscribe: jest.fn()
    })

    fetch.mockResponses(
      [__NOTIFICATIONS_PUBLIC_KEY__, { status: 200 }],
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
    const { subscribe } = setServiceWorker({
      subscribe: jest.fn()
    })

    fetch.mockResponses(['', { status: 200 }], ['', { status: 200 }])

    await notifications.subscribe()

    expect(fetch).toHaveBeenCalledTimes(1)
    expect(subscribe).toHaveBeenCalledTimes(0)
  })

  test('should get subscription', async () => {
    const { getSubscription } = setServiceWorker()
    const result = await notifications.getSubscription()

    expect(result).toEqual({})
    expect(getSubscription).toHaveBeenCalledTimes(1)
  })

  test('should throw error on get subscription', async () => {
    setServiceWorker({
      getSubscription: jest.fn().mockImplementation(() => Promise.reject({}))
    })

    await expect(notifications.getSubscription()).rejects.toThrowError(
      'Notifications: can not get subscription'
    )
  })
})
