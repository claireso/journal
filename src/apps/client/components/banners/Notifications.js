import React, { useState, useEffect, useContext } from 'react'
import styled from 'styled-components'

import TranslationsContext from '@common/context/Translations'
import notifications from '@common/utils/notifications'

import Flash from '../Flash'

const ButtonSubscribe = styled.a.attrs(() => ({
  href: '#',
  role: 'button'
}))`
  color: inherit;
  text-decoration: none;

  &:before {
    content: '';
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }

  &:hover {
    border-bottom: 1px solid currentColor;
  }
`

/**
 * checkSubscription: check if subscription is expired
 * @return Boolean
 */
const checkSubscription = async () => {
  try {
    const subscription = await notifications.getSubscription()

    // expired subscription
    if (!subscription) {
      return true
    }

    return false
  } catch (err) {
    throw new Error('Banner: Can not check subscription')
  }
}

export default () => {
  const [isVisible, setIsVisible] = useState(false)
  const translations = useContext(TranslationsContext)

  const subscribe = async event => {
    event && event.preventDefault()

    try {
      await notifications.subscribe()
      hideBanner()
    } catch (err) {
      // user decline
      if (notifications.areDenied()) {
        hideBanner()
        return
      }

      throw new Error('Banner: can not subscribe')
    }
  }

  const hideBanner = () => setIsVisible(false)
  const showBanner = () => setIsVisible(true)

  useEffect(() => {
    // do not display banner if service worker not support
    // do not display banner if push not enabled
    // do not display banner in safari
    if (
      !('serviceWorker' in navigator) ||
      (process.env.NODE_ENV !== 'production' &&
        process.env.NODE_ENV !== 'test') ||
      !process.env.IS_PUSH_ENABLED ||
      window.safari
    ) {
      return
    }

    // show banner if user
    // - has not already subscribed
    // - or has not denied notification
    if (notifications.areDefault()) {
      showBanner()
      return
    }

    // check if subscription is expired
    if (notifications.areGranted()) {
      checkSubscription()
        .then(isSubscriptionExpired => {
          if (isSubscriptionExpired) {
            subscribe()
          }
        })
        .catch(() => {})
    }
  }, [])

  if (!isVisible) return null

  return (
    <Flash onClose={hideBanner}>
      <ButtonSubscribe onClick={subscribe}>
        {translations.bannerNotifications}
      </ButtonSubscribe>
    </Flash>
  )
}
