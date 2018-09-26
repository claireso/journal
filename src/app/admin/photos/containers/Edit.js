import { connect } from 'react-redux'
import { navigate } from '@reach/router'

import Edit from '../views/Edit'

import {
  editPhoto,
  EDIT_PHOTO_SUCCESS,
  loadPhoto
} from '@common/actions/photos'

const mapStateToProps = (state, props) => ({
  photo:
    state.photos.items.find(photo => photo.id === Number(props.id)) ||
    state.photos.detail,
  error: state.photos.error
})

const mapDispatchToProps = dispatch => ({
  editPhoto(id, data) {
    dispatch(editPhoto(id, data)).then(action => {
      if (action.type === EDIT_PHOTO_SUCCESS) {
        navigate('/admin/photos')
        return
      }

      document.querySelector('.modal').scrollTo(0, 0)
    })
  },

  loadPhoto(id) {
    dispatch(loadPhoto(id))
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Edit)
