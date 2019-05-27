import React, { useState, useEffect, useCallback } from 'react'
import styled from 'styled-components'

import { useTranslations } from '@common/context/Translations'
import notifications from '@common/utils/notifications'

import Flash from '../../Flash'

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

const NotificationBanner = () => {
  const [isVisible, setIsVisible] = useState(false)
  const translations = useTranslations()

  const hideBanner = useCallback(() => setIsVisible(false), [])
  const showBanner = useCallback(() => setIsVisible(true), [])

  const subscribe = useCallback(
    async event => {
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
    },
    [hideBanner]
  )

  useEffect(() => {
    // do not display banner if service worker or Notification is not support
    // do not display banner if push is not enabled
    // do not display banner in safari
    if (
      !process.env.IS_PUSH_ENABLED ||
      !('serviceWorker' in navigator) ||
      !('Notification' in window) ||
      (process.env.NODE_ENV !== 'production' &&
        process.env.NODE_ENV !== 'test') ||
      window.safari
    ) {
      return
    }

    // do not display banner if if user has denied notifications
    if (notifications.areDenied()) {
      return
    }

    // check if user has already subscribed
    notifications
      .getSubscription()
      .then(subscription => {
        if (!subscription) {
          showBanner()
        }
      })
      .catch(() => {
        throw new Error('Banner can not get subscription')
      })
  }, [showBanner])

  if (!isVisible) return null

  return (
    <Flash onClose={hideBanner}>
      <ButtonSubscribe onClick={subscribe}>
        {translations.bannerNotifications}
      </ButtonSubscribe>
    </Flash>
  )
}

export default NotificationBanner
