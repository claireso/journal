import { connect } from 'react-redux'
import { navigate } from '@reach/router'

import Edit from '../views/Edit'

import { editPhoto, EDIT_PHOTO_SUCCESS } from '../../../../common/actions/photos'

const mapStateToProps = (state, props) => ({
  photo: state.photos.items.find(photo => photo.id === Number(props.id)),
  error: state.photos.error,
})

const mapDispatchToProps = (dispatch) => ({
  editPhoto(id, data) {
    dispatch(editPhoto(id, data))
    .then(action => {
      if (action.type === EDIT_PHOTO_SUCCESS) {
        navigate('/admin/photos')
        return
      }

      document.querySelector('.modal').scrollTo(0,0)
    })
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Edit)
