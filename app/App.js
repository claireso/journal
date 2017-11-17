import React from 'react'
import PropTypes from 'prop-types'

import Photo from './Photo'

const App = (props) => {
  return (
    <main>
      { props.photos.map((photo, index) => <Photo key={ index } { ...photo } />) }

      <ul className="pager">
        { props.pager.first &&
          <li>
            <a className="pager__item" title="First page" href="/">««</a>
          </li>
        }

        { props.pager.prev &&
          <li>
            <a className="pager__item" title="Previous page" href={ `/page/${ props.pager.prev }` }>«</a>
          </li>
        }

        { props.pager.next &&
          <li>
            <a className="pager__item" title="Next page" href={ `/page/${ props.pager.next }` }>»</a>
          </li>
        }
        { props.pager.last &&
          <li>
            <a className="pager__item" title="Last page" href={ `/page/${ props.pager.last }` }>»»</a>
          </li>
        }
      </ul>
    </main>
  )
}

App.propTypes = {
  photos: PropTypes.array.isRequired,
  pager: PropTypes.object.isRequired
}

export default App