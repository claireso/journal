import { connect } from 'react-redux'
import { navigate } from '@reach/router'

import Create from '../views/Create'

import { createPhoto, CREATE_PHOTO_SUCCESS } from '@common/actions/photos'

import { displaySuccessMessage } from '@common/actions/messages'

const mapStateToProps = state => ({
  error: state.photos.error,
  isProcessing: state.photos.isProcessing
})

const mapDispatchToProps = dispatch => ({
  createPhoto(data) {
    dispatch(createPhoto(data)).then(action => {
      if (action.type === CREATE_PHOTO_SUCCESS) {
        navigate('/admin/photos')
        dispatch(
          displaySuccessMessage({
            message: 'Your photo has been created successfully',
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
)(Create)
