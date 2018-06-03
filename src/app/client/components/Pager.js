import React from 'react'
import PropTypes from 'prop-types'

const Pager = (props = {}) => {
  return (
    <ul className="pager">
      {props.first && (
        <li>
          <a className="pager__item" title="First page" href="/">
            ««
          </a>
        </li>
      )}

      {props.prev && (
        <li>
          <a
            className="pager__item"
            title="Previous page"
            href={`/page/${props.prev}`}
          >
            «
          </a>
        </li>
      )}

      {props.next && (
        <li>
          <a
            className="pager__item"
            title="Next page"
            href={`/page/${props.next}`}
          >
            »
          </a>
        </li>
      )}
      {props.last && (
        <li>
          <a
            className="pager__item"
            title="Last page"
            href={`/page/${props.last}`}
          >
            »»
          </a>
        </li>
      )}
    </ul>
  )
}

Pager.propTypes = {
  first: PropTypes.number,
  prev: PropTypes.number,
  next: PropTypes.number,
  last: PropTypes.number
}

export default Pager
