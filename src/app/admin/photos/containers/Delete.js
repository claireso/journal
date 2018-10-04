import { connect } from 'react-redux'
import { navigate } from '@reach/router'

import Delete from '../views/Delete'

import { deletePhoto, DELETE_PHOTO_SUCCESS } from '@common/actions/photos'
import { displaySuccessMessage } from '@common/actions/messages'

const mapStateToProps = state => ({
  isProcessing: state.photos.isProcessing
})

const mapDispatchToProps = dispatch => ({
  deletePhoto(id) {
    dispatch(deletePhoto(Number(id))).then(action => {
      if (action.type === DELETE_PHOTO_SUCCESS) {
        navigate('/admin/photos')
        dispatch(
          displaySuccessMessage({
            message: 'Your photo has been deleted successfully',
            key: 'CRUD_PHOTO'
          })
        )
        return
      }

      document.querySelector('#modal').scrollTo(0, 0)
    })
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Delete)
