import { connect } from 'react-redux'
import { navigate } from '@reach/router'
import qs from 'qs'

import Edit from '../views/modals/Edit'

import { editPhoto, EDIT_PHOTO_SUCCESS, loadPhoto } from '@admin/actions/photos'

import { displaySuccessMessage } from '@admin/actions/messages'

const mapStateToProps = state => ({
  error: state.photos.error,
  isProcessing: state.photos.isProcessing
})

const mapDispatchToProps = dispatch => ({
  editPhoto(id, data) {
    dispatch(editPhoto(id, data)).then(action => {
      if (action.type === EDIT_PHOTO_SUCCESS) {
        const query = qs.parse(window.location.search.substring(1))
        const search = qs.stringify({
          ...query,
          action: undefined,
          id: undefined
        })
        navigate(`?${search}`)
        dispatch(
          displaySuccessMessage({
            message: 'Your photo has been updated successfully',
            key: 'CRUD_PHOTO'
          })
        )
        window.scrollTo(0, 0)
        return
      }

      document.querySelector('#modal').scrollTo(0, 0)
    })
  },

  loadPhoto(id) {
    dispatch(loadPhoto(id))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Edit)
