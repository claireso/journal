'use client'

import React, { useState, useEffect, useCallback } from 'react'

import { useTranslations } from '@web/hooks/useTranslations'
import * as notifications from '@web/services/notifications'
import { getSubscription } from '@application/usecases'

import * as cls from './styles.css'

import Link from '@web/components/Links'
import Flash from '@web/components/Flash'

const BannerNotifications = () => {
  const [isVisible, setIsVisible] = useState(false)
  const translations = useTranslations()

  const hideBanner = useCallback(() => setIsVisible(false), [])
  const showBanner = useCallback(() => setIsVisible(true), [])

  const subscribe = useCallback(
    async (event: React.MouseEvent<HTMLAnchorElement>) => {
      event?.preventDefault()

      try {
        await notifications.subscribe()
        hideBanner()
      } catch {
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
      process.env.NEXT_PUBLIC_IS_NOTIFICATIONS_ENABLED === 'false' ||
      !('serviceWorker' in navigator) ||
      !('Notification' in window) ||
      'safari' in window // @TODO
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
      .then(async (subscription) => {
        if (!subscription) {
          showBanner()
          return
        }

        // check if subscription is valid
        if (!notifications.isSubscriptionValid(subscription)) {
          // if not valid unsubscribe the user and renew the subscription
          await subscription.unsubscribe()
          await notifications.subscribe()
          return
        }

        try {
          const remoteSubscription = await getSubscription({ endpoint: subscription.endpoint })
          if (!remoteSubscription) {
            await subscription.unsubscribe()
            showBanner()
          }
        } catch {
          showBanner()
        }
      })
      .catch(() => {
        throw new Error('Banner: can not get subscription')
      })
  }, [showBanner])

  if (!isVisible) return null

  return (
    <Flash status="info" onClose={hideBanner}>
      <Link className={cls.link} role="button" href="#" onClick={subscribe}>
        {translations.bannerNotifications as string}
      </Link>
    </Flash>
  )
}

export default BannerNotifications
