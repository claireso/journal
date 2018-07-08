import { connect } from 'react-redux'
import { navigate } from '@reach/router'

import Delete from '../views/Delete'

import { deletePhoto, DELETE_PHOTO_SUCCESS } from '../../../../common/actions/photos'

const mapStateToProps = (state) => ({
  // error: state.photos.error,
})

const mapDispatchToProps = (dispatch) => ({
  deletePhoto(id) {
    dispatch(deletePhoto(Number(id)))
    .then(action => {
      if (action.type === DELETE_PHOTO_SUCCESS) {
        navigate('/admin/photos')
        return
      }

      document.querySelector('.modal').scrollTo(0,0)
    })
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Delete)
