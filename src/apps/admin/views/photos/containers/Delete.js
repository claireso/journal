import { connect } from 'react-redux'
import { navigate } from '@reach/router'
import qs from 'qs'

import Delete from '../views/modals/Delete'

import { deletePhoto, DELETE_PHOTO_SUCCESS } from '@admin/actions/photos'
import { displaySuccessMessage } from '@admin/actions/messages'

const mapStateToProps = state => ({
  isProcessing: state.photos.isProcessing
})

const mapDispatchToProps = dispatch => ({
  deletePhoto(id) {
    dispatch(deletePhoto(Number(id))).then(action => {
      if (action.type === DELETE_PHOTO_SUCCESS) {
        const query = qs.parse(window.location.search.substring(1))
        const search = qs.stringify({
          ...query,
          action: undefined,
          id: undefined
        })
        navigate(`?${search}`)
        dispatch(
          displaySuccessMessage({
            message: 'Your photo has been deleted successfully',
            key: 'CRUD_PHOTO'
          })
        )
        window.scrollTo(0, 0)
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
