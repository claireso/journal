import React from 'react'

import type { SubscriptionDto } from '@dto'
import { formatDateTime } from '@utils/date'

import Text from '@web/components/Text'
import ButtonDelete from './ButtonDelete'

import * as cls from './styles.css'

type SubscriptionProps = SubscriptionDto

const Subscription = ({ id, ...props }: SubscriptionProps) => {
  const createdAt = props.created_at

  return (
    <li className={cls.wrapper}>
      <div className={cls.content}>
        <Text as="span" weight="semibold">
          Created at:{' '}
          <Text weight="normal" as="span">
            {formatDateTime(createdAt)}
          </Text>
        </Text>
        <Text as="span" weight="semibold">
          Endpoint:{' '}
          <Text className={cls.url} weight="normal" as="span">
            {props.subscription.endpoint}
          </Text>
        </Text>
      </div>

      <div>
        <ButtonDelete id={id} />
      </div>
    </li>
  )
}

export default Subscription
