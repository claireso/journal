import React, { useCallback } from 'react'
import PropTypes from 'prop-types'

import * as S from './Pager.styles'

import usePagination from '@utils/hooks/usePagination'

import { Button } from '../Buttons'

const Pager = ({ navigate, ...props }) => {
  const items = usePagination(props)

  const handleClick = useCallback((page) => () => navigate(page), [navigate])

  return (
    <S.Pager>
      {items.map((item, key) => (
        <li key={key}>
          <Button title={item.title} onClick={handleClick(item.page)}>
            {item.label}
          </Button>
        </li>
      ))}
    </S.Pager>
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
