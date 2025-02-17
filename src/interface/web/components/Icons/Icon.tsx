import React from 'react'
import {
  PhotoIcon,
  BellAlertIcon,
  PlusIcon,
  PencilIcon,
  TrashIcon,
  XMarkIcon,
  ArrowUpTrayIcon,
  ChevronDownIcon,
  ArrowLeftIcon,
  GlobeAltIcon,
  ArrowRightStartOnRectangleIcon
} from '@heroicons/react/24/outline'

import type { IconVariants } from './styles.css'
import * as cls from './styles.css'
import clsx from '@utils/clsx'

const iconEntries = [
  ['photo', PhotoIcon],
  ['alert', BellAlertIcon],
  ['plus', PlusIcon],
  ['pencil', PencilIcon],
  ['trash', TrashIcon],
  ['close', XMarkIcon],
  ['upload', ArrowUpTrayIcon],
  ['arrow-down', ChevronDownIcon],
  ['arrow-left', ArrowLeftIcon],
  ['exit', ArrowRightStartOnRectangleIcon],
  ['website', GlobeAltIcon]
] as const

const iconMap = new Map<(typeof iconEntries)[number][0], (typeof iconEntries)[number][1]>(iconEntries)

export type IconName = (typeof iconEntries)[number][0]

type IconProps = {
  name: IconName
  className?: string
} & IconVariants

const Icon = ({ name, size = 'md', variant = 'default', className = '' }: IconProps) => {
  const IconComponent = iconMap.get(name)

  if (!IconComponent) {
    throw new Error(`The icon "${name}" does not exist`)
  }

  return <IconComponent className={clsx([cls.icon({ size, variant }), className])} />
}

export default Icon
