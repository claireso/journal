import React from 'react'
import PropTypes from 'prop-types'

const Item = photo => {
  return (
    <li className="list__item">
      <div className="list__picture">
        <img src={`/img/${photo.name}`} />
      </div>
      <div className="list__text">
        <h2 className="title">{photo.title}</h2>
        <p className="subtitle">{photo.description}</p>
        <p className="list__buttons">
          <a className="btn" href={`/admin/photos/${photo.id}/edit`}>
            {' '}
            Edit{' '}
          </a>
          <a className="btn" href={`/admin/photos/${photo.id}/delete`}>
            {' '}
            Delete{' '}
          </a>
        </p>
      </div>
    </li>
  )
}

Item.propTypes = {
  description: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
}

const List = ({ photos }) => {
  return (
    <ul className="list">
      {photos.map((photo, index) => <Item key={index} {...photo} />)}
    </ul>
  )
}

List.propTypes = {
  photos: PropTypes.arrayOf(PropTypes.object).isRequired
}

const Pager = ({ pager }) => {
  return (
    <ul className="pager">
      {pager.first && (
        <li className="pager__item">
          <a
            className="btn btn--gray"
            title="First page"
            href={`/admin/photos/page/${pager.first}`}
          >
            ««
          </a>
        </li>
      )}

      {pager.prev && (
        <li className="pager__item">
          <a
            className="btn btn--gray"
            title="Previous page"
            href={`/admin/photos/page/${pager.prev}`}
          >
            «
          </a>
        </li>
      )}

      {pager.next && (
        <li className="pager__item">
          <a
            className="btn btn--gray"
            title="Next page"
            href={`/admin/photos/page/${pager.next}`}
          >
            »
          </a>
        </li>
      )}
      {pager.last && (
        <li className="pager__item">
          <a
            className="btn btn--gray"
            title="Last page"
            href={`/admin/photos/page/${pager.last}`}
          >
            »»
          </a>
        </li>
      )}
    </ul>
  )
}

Pager.propTypes = {
  pager: PropTypes.shape({
    first: PropTypes.number,
    prev: PropTypes.number,
    next: PropTypes.number,
    last: PropTypes.number
  }).isRequired
}

const PhotosList = ({ photos, pager }) => {
  return (
    <main>
      <h1> List photos </h1>
      <p className="align-right">
        <a className="btn btn--icon" href="/admin/photos/new">
          Add a photo
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
          >
            <path d="M18.984 12.984h-6v6h-1.97v-6h-6v-1.97h6v-6h1.97v6h6v1.97z" />
          </svg>
        </a>
      </p>
      <List photos={photos} />
      <Pager pager={pager} />
    </main>
  )
}

PhotosList.propTypes = {
  photos: PropTypes.arrayOf(PropTypes.object).isRequired,
  pager: PropTypes.object.isRequired
}

export default PhotosList
