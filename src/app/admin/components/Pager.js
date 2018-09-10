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

class Pager extends React.PureComponent {
  getItems() {
    const { first, prev, next, last } = this.props
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

  getItemsProps = ({ item, ...customProps } = {}) => {
    const { navigate } = this.props

    return {
      ...customProps,
      onClick: event => {
        event && event.preventDefault()
        navigate && navigate(item.page)
      }
    }
  }

  render() {
    return (
      <PagerWrapper>
        {this.props.children({
          items: this.getItems(),
          getItemsProps: this.getItemsProps
        })}
      </PagerWrapper>
    )
  }
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
