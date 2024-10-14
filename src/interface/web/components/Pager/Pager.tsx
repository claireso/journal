import React, { useCallback } from 'react'

import { ButtonDark } from '../Buttons'

import * as cls from './styles.css'

interface PagerProps {
  navigate: (page: string) => void
  first?: number
  prev?: number
  next?: number
  last?: number
}

const Pager = ({ navigate, first, prev, next, last }: PagerProps) => {
  const handleClick = useCallback((page: number) => () => navigate(`${page}`), [navigate])

  return (
    <ul className={cls.wrapper}>
      {first && (
        <li>
          <ButtonDark title="First page" onClick={handleClick(first)}>
            ««
          </ButtonDark>
        </li>
      )}

      {prev && (
        <li>
          <ButtonDark title="Previous page" onClick={handleClick(prev)}>
            «
          </ButtonDark>
        </li>
      )}

      {next && (
        <li>
          <ButtonDark title="Next page" onClick={handleClick(next)}>
            »
          </ButtonDark>
        </li>
      )}

      {last && (
        <li>
          <ButtonDark title="Last page" onClick={handleClick(last)}>
            »»
          </ButtonDark>
        </li>
      )}
    </ul>
  )
}

export default Pager
