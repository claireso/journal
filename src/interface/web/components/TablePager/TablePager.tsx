import React from 'react'

import Text from '../Text'

import * as cls from './styles.css'
import type { TablePagerVariants } from './styles.css'

export type TablePagerProps = {
  count: number
  totalPages: number
  offset: number
  limit: number
} & TablePagerVariants

const TablePager = ({ count, totalPages, offset, limit, align }: TablePagerProps) => {
  const start = count > 0 ? offset + 1 : 0
  const end = count < limit ? count : start + limit - 1

  return (
    <Text color="neutral" size="sm" className={cls.pager({ align })}>
      {start}-{end} of {count}
    </Text>
  )
}

export default TablePager
