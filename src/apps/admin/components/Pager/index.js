import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import usePagination from '@common/hooks/pagination'

import { PagerButton } from '../Buttons'

const PagerWrapper = styled.ul`
  display: inline-flex;
  justify-content: center;
  list-style-type: none;
  width: 100%;
  padding: 0;

  > li {
    margin: 0 0.3rem;
  }
`

const Pager = ({ navigate, ...props }) => {
  const items = usePagination(props)

  const handleClick = useCallback(page => () => navigate({ page }), [navigate])

  return (
    <PagerWrapper>
      {items.map(item => (
        <li key={item.label}>
          <PagerButton title={item.title} onClick={handleClick(item.page)}>
            {item.label}
          </PagerButton>
        </li>
      ))}
    </PagerWrapper>
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
