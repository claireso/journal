import React, { useCallback } from 'react'
import PropTypes from 'prop-types'

import * as S from './Pager.styles'

const Pager = ({ navigate, first, prev, next, last }) => {
  const handleClick = useCallback((page) => () => navigate(page), [navigate])

  return (
    <S.PagerWrapper>
      {first && (
        <li>
          <S.PagerButton data-testid="first-page" title="First page" onClick={handleClick(first)}>
            ««
          </S.PagerButton>
        </li>
      )}

      {prev && (
        <li>
          <S.PagerButton data-testid="previous-page" title="Previous page" onClick={handleClick(prev)}>
            «
          </S.PagerButton>
        </li>
      )}

      {next && (
        <li>
          <S.PagerButton data-testid="next-page" title="Next page" onClick={handleClick(next)}>
            »
          </S.PagerButton>
        </li>
      )}

      {last && (
        <li>
          <S.PagerButton data-testid="last-page" title="Last page" onClick={handleClick(last)}>
            »
          </S.PagerButton>
        </li>
      )}
    </S.PagerWrapper>
  )
}

Pager.propTypes = {
  navigate: PropTypes.func.isRequired,
  first: PropTypes.number,
  prev: PropTypes.number,
  next: PropTypes.number,
  last: PropTypes.number
}

export default Pager
