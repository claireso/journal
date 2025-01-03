'use client'

import React, { useCallback } from 'react'

import { ButtonDark } from '../Buttons'
import Text from '../Text'

import * as cls from './styles.css'

const Layouts = {
  Numeric: 'numeric',
  Minimal: 'minimal'
} as const

interface PagerProps {
  navigate: (page: string) => void
  first?: number
  prev?: number
  next?: number
  last?: number
  count: number
  totalPages: number
  offset: number
  limit: number
  layout?: (typeof Layouts)[keyof typeof Layouts]
}

const Pager = ({ navigate, layout = Layouts.Minimal, first, prev, next, last, count, offset, limit }: PagerProps) => {
  const start = count > 0 ? offset + 1 : 0
  const end = count < limit ? count : Math.min(start + limit - 1, count)
  const withLayoutNumeric = layout === Layouts.Numeric

  const handleClick = useCallback((page: number) => () => navigate(`${page}`), [navigate])

  return (
    <ul className={cls.wrapper}>
      {(first || withLayoutNumeric) && (
        <li>
          <ButtonDark title="First page" disabled={!first} onClick={first ? handleClick(first) : undefined}>
            ««
          </ButtonDark>
        </li>
      )}

      {(prev || withLayoutNumeric) && (
        <li>
          <ButtonDark title="Previous page" disabled={!prev} onClick={prev ? handleClick(prev) : undefined}>
            «
          </ButtonDark>
        </li>
      )}

      {withLayoutNumeric && (
        <li className={cls.numeric}>
          <Text color="neutral" size="sm" className={''}>
            {start}-{end} of {count}
          </Text>
        </li>
      )}

      {(next || withLayoutNumeric) && (
        <li>
          <ButtonDark title="Next page" disabled={!next} onClick={next ? handleClick(next) : undefined}>
            »
          </ButtonDark>
        </li>
      )}

      {(last || withLayoutNumeric) && (
        <li>
          <ButtonDark title="Last page" disabled={!last} onClick={last ? handleClick(last) : undefined}>
            »»
          </ButtonDark>
        </li>
      )}
    </ul>
  )
}

export default Pager
