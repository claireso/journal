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

const iconMap = {
  photo: PhotoIcon,
  alert: BellAlertIcon,
  plus: PlusIcon,
  pencil: PencilIcon,
  trash: TrashIcon,
  close: XMarkIcon,
  upload: ArrowUpTrayIcon,
  'arrow-down': ChevronDownIcon,
  'arrow-left': ArrowLeftIcon,
  exit: ArrowRightStartOnRectangleIcon,
  website: GlobeAltIcon
} as const

export type IconName = keyof typeof iconMap

type IconProps = {
  name: IconName
  className?: string
} & IconVariants

const Icon = ({ name, size = 'md', variant = 'default', className = '' }: IconProps) => {
  const IconComponent = iconMap[name]

  return <IconComponent className={clsx([cls.icon({ size, variant }), className])} />
}

export default Icon
