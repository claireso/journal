import React, { useCallback } from 'react'
import PropTypes from 'prop-types'

import Photo from './components/Photo'
import Pager from './components/Pager'
import { Button } from './components/Button'

const Photos = (props = {}) => {
  const onNavigate = useCallback(page => {
    const state = { page }
    window.history.pushState(state, '', `?page=${page}`)

    const popStateEvent = new PopStateEvent('popstate', { state })
    dispatchEvent(popStateEvent)
  }, [])

  return (
    <React.Fragment>
      {props.photos.map((photo, index) => (
        <Photo key={index} {...photo} />
      ))}
      <Pager {...props.pager} navigate={onNavigate}>
        {({ items, getItemsProps }) => {
          return items.map((item, key) => (
            <li key={key}>
              <Button
                {...getItemsProps({
                  title: item.title,
                  item: item
                })}
              >
                {item.label}
              </Button>
            </li>
          ))
        }}
      </Pager>
    </React.Fragment>
  )
}

Photos.propTypes = {
  photos: PropTypes.array.isRequired,
  pager: PropTypes.object.isRequired
}

export default Photos
