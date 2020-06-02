import React, { useCallback } from 'react'
import PropTypes from 'prop-types'

// @TODO
import usePagination from '@utils/hooks/usePagination'

import { PagerButton } from '../Buttons'

import * as S from './Pager.styles'

const Pager = ({ navigate, ...props }) => {
  const items = usePagination(props)

  const handleClick = useCallback((page) => () => navigate({ page }), [
    navigate
  ])

  return (
    <S.PagerWrapper>
      {items.map((item) => (
        <li key={item.label}>
          <PagerButton title={item.title} onClick={handleClick(item.page)}>
            {item.label}
          </PagerButton>
        </li>
      ))}
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
