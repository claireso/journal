import React, { useState, useEffect, useCallback } from 'react'

import { useTranslations } from '@services/translations/hooks/useTranslations'
import * as notifications from '@services/notifications'

import * as S from './Notifications.styles'

import Flash from '@components/Flash'

const NotificationBanner = () => {
  const [isVisible, setIsVisible] = useState(false)
  const translations = useTranslations()

  const hideBanner = useCallback(() => setIsVisible(false), [])
  const showBanner = useCallback(() => setIsVisible(true), [])

  const subscribe = useCallback(
    async (event) => {
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
      !process.env.IS_NOTIFICATIONS_ENABLED ||
      !('serviceWorker' in navigator) ||
      !('Notification' in window) ||
      window.safari // @TODO
    ) {
      return
    }

    // do not display banner if user has denied notifications
    if (notifications.areDenied()) {
      return
    }

    // check if user has already subscribed
    notifications
      .getSubscription()
      .then((subscription) => {
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
    <Flash
      data-testid="flash-notifications"
      status="default"
      onClose={hideBanner}
    >
      <S.ButtonSubscribe onClick={subscribe}>
        {translations.bannerNotifications}
      </S.ButtonSubscribe>
    </Flash>
  )
}

export default NotificationBanner
