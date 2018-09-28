import notifications from './utils/notifications'

class Banner {

  static CLS_HIDDEN = 'is-hidden'

  constructor(dom, buttonClose) {
    this.dom = dom
    this.buttonClose = buttonClose

    if (!('serviceWorker' in navigator)) {
      throw new Error('Service worker not available')
    }

    navigator.serviceWorker.register('/sw.js')

    // show banner if user
    // - has not already subscribed
    // - or has not denied notification
    if (notifications.areDefault()) this.show()
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
    } catch(err) {
      // user decline
      if (notifications.areDenied()) {
        this.hide()
        return
      }

      throw new Error('Banner can not subscribe')
    }
  }
}

new Banner(
  document.querySelector('#js-notification'),
  document.querySelector('#js-notification-close')
)