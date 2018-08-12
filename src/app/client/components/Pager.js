import React from 'react'
import PropTypes from 'prop-types'

class Pager extends React.Component {

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

  getItemsProps = ({item, ...customProps} = {}) => {
    const { navigate } = this.props

    return {
      ...customProps,
      onClick: (event) => {
        event && event.preventDefault()
        navigate && navigate(item.page)
      }
    }
  }

  render() {
    return (
      <ul className="pager">
        {
          this.props.children({
            items: this.getItems(),
            getItemsProps: this.getItemsProps,
          })
        }
      </ul>
    )
  }
}

Pager.propTypes = {
  first: PropTypes.number,
  prev: PropTypes.number,
  next: PropTypes.number,
  last: PropTypes.number
}

export default Pager
