import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

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

const Pager = props => {
  return (
    <PagerWrapper>
      {props.children({
        items: getItems(props),
        getItemsProps: getItemsProps(props)
      })}
    </PagerWrapper>
  )
}

Pager.propTypes = {
  navigate: PropTypes.func.isRequired,
  first: PropTypes.number,
  prev: PropTypes.number,
  next: PropTypes.number,
  last: PropTypes.number,
  children: PropTypes.func.isRequired
}

export default Pager
