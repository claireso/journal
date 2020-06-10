import PropTypes from 'prop-types'

import compose from '@utils/compose'

import withLayoutAdmin from '@features/admin/hoc/withLayoutAdmin'
import withModalEdition from '@features/admin/hoc/withModalEdition'

import ListPhotos from '@features/admin/photos/Photos'
import ModalCreatePhoto from '@features/admin/photos/modals/Create'
import ModalEditPhoto from '@features/admin/photos/modals/Edit'
import ModalDeletePhoto from '@features/admin/photos/modals/Delete'

import PhotosReducer, { ACTION_TYPES } from '@features/admin/photos/reducer'

const { PhotosProvider, INITIAL_STATE } = PhotosReducer

const Photos = (props) => {
  return (
    <PhotosProvider value={INITIAL_STATE}>
      <ListPhotos />
      {props.modal}
    </PhotosProvider>
  )
}

Photos.propTypes = {
  modal: PropTypes.element
}

const getModalChildComponent = (id, action) => {
  let component

  switch (action) {
    case ACTION_TYPES.CREATE: {
      component = <ModalCreatePhoto />
      break
    }
    case ACTION_TYPES.DELETE: {
      if (!id) return null
      component = <ModalDeletePhoto id={id} />
      break
    }
    case ACTION_TYPES.EDIT: {
      if (!id) return null
      component = <ModalEditPhoto id={id} />
      break
    }
  }

  return component
}

export default compose(
  withLayoutAdmin,
  withModalEdition(getModalChildComponent)
)(Photos)
