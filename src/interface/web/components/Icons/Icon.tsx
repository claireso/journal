import React from 'react'
import {
  PhotoIcon,
  BellAlertIcon,
  PlusIcon,
  PencilIcon,
  TrashIcon,
  XMarkIcon,
  ArrowUpTrayIcon,
  ChevronDownIcon
} from '@heroicons/react/24/outline'

import type { IconVariants } from './styles.css'
import * as cls from './styles.css'

const iconEntries = [
  ['photo', PhotoIcon],
  ['alert', BellAlertIcon],
  ['plus', PlusIcon],
  ['pencil', PencilIcon],
  ['trash', TrashIcon],
  ['close', XMarkIcon],
  ['upload', ArrowUpTrayIcon],
  ['arrow-down', ChevronDownIcon]
] as const

const iconMap = new Map<(typeof iconEntries)[number][0], (typeof iconEntries)[number][1]>(iconEntries)

type IconName = (typeof iconEntries)[number][0]

type IconProps = {
  name: IconName
} & IconVariants

const Icon = ({ name, size = 'md', variant = 'default' }: IconProps) => {
  const IconComponent = iconMap.get(name)

  if (!IconComponent) {
    throw new Error(`The icon "${name}" does not exist`)
  }

  return <IconComponent className={cls.icon({ size, variant })} />
}

export default Icon
