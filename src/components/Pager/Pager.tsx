import React, { useCallback } from 'react'

import * as S from './Pager.styles'

interface PagerProps {
  navigate: (page: string) => void
  first?: number
  prev?: number
  next?: number
  last?: number
}

const Pager = ({ navigate, first, prev, next, last }: PagerProps) => {
  const handleClick = useCallback((page) => () => navigate(`${page}`), [navigate])

  return (
    <S.Wrapper>
      {first && (
        <li>
          <S.Button data-testid="first-page" title="First page" onClick={handleClick(first)}>
            ««
          </S.Button>
        </li>
      )}

      {prev && (
        <li>
          <S.Button data-testid="previous-page" title="Previous page" onClick={handleClick(prev)}>
            «
          </S.Button>
        </li>
      )}

      {next && (
        <li>
          <S.Button data-testid="next-page" title="Next page" onClick={handleClick(next)}>
            »
          </S.Button>
        </li>
      )}

      {last && (
        <li>
          <S.Button data-testid="last-page" title="Last page" onClick={handleClick(last)}>
            »
          </S.Button>
        </li>
      )}
    </S.Wrapper>
  )
}

export default Pager
