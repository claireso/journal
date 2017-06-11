import React from 'react';
import Photo from './Photo';

export default props => {
  return (
    <main>
      { props.photos.map((photo, index) => <Photo key={ index } { ...photo } />) }

      <ul className="pager">
        { props.pager.first &&
          <li>
            <a className="pager__item" title="First page" href={ `/` }>««</a>
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
