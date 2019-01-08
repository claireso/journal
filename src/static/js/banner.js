import notifications from './utils/notifications'

class Banner {
  static CLS_HIDDEN = 'is-hidden'

  constructor(dom, buttonClose) {
    this.dom = dom
    this.buttonClose = buttonClose

    if (
      !('serviceWorker' in navigator) ||
      process.env.NODE_ENV !== 'production'
    ) {
      return
    }

    navigator.serviceWorker.register('/sw.js')

    // do not display banner in safari
    if (window.safari) {
      return
    }

    // show banner if user
    // - has not already subscribed
    // - or has not denied notification
    if (notifications.areDefault()) {
      this.show()
      return
    }

    // check if subscription is expired
    if (notifications.areGranted()) {
      this.checkSubscription()
    }
  }

  show() {
    this.dom.classList.remove(Banner.CLS_HIDDEN)
    this.dom.addEventListener('click', this.subscribe)
    this.buttonClose.addEventListener('click', this.hide)
  }

  hide = () => {
    this.dom.classList.add(Banner.CLS_HIDDEN)
    this.dom.removeEventListener('click', this.subscribe)
    this.buttonClose.removeEventListener('click', this.closeBanner)
  }

  subscribe = async () => {
    try {
      await notifications.subscribe()
      this.hide()
    } catch (err) {
      // user decline
      if (notifications.areDenied()) {
        this.hide()
        return
      }

      throw new Error('Banner: can not subscribe')
    }
  }

  checkSubscription = async () => {
    try {
      const subscription = await notifications.getSubscription()

      // expired subscription
      if (!subscription) {
        this.subscribe()
      }
    } catch (err) {
      throw new Error('Banner: Can not check subscription')
    }
  }
}

new Banner(
  document.querySelector('#js-notification'),
  document.querySelector('#js-notification-close')
)
