import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const StyledPager = styled.ul`
  margin: 0 0 8.5rem;
  padding: 0;
  text-align: center;

  > li {
    display: inline-block;
    margin: 0 0.5rem;
  }
`

const getItems = props => {
  const { first, prev, next, last } = props
  const items = []

  if (first) {
    items.push({
      label: '««',
      title: 'First page',
      page: first
    })
  }

  if (prev) {
    items.push({
      label: '«',
      title: 'Previous page',
      page: prev
    })
  }

  if (next) {
    items.push({
      label: '»',
      title: 'Next page',
      page: next
    })
  }

  if (last) {
    items.push({
      label: '»»',
      title: 'Last page',
      page: last
    })
  }

  return items
}

const getItemsProps = props => ({ item, ...customProps } = {}) => {
  const { navigate } = props

  return {
    ...customProps,
    onClick: event => {
      event && event.preventDefault()
      navigate && navigate(item.page)
    }
  }
}

const Pager = ({ children, ...props }) => {
  return (
    <StyledPager>
      {children({
        items: getItems(props),
        getItemsProps: getItemsProps(props)
      })}
    </StyledPager>
  )
}

Pager.propTypes = {
  first: PropTypes.number,
  prev: PropTypes.number,
  next: PropTypes.number,
  last: PropTypes.number,
  navigate: PropTypes.func,
  children: PropTypes.func.isRequired
}

export default Pager
