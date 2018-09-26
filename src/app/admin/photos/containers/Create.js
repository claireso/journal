import { connect } from 'react-redux'
import { navigate } from '@reach/router'

import Create from '../views/Create'

import {
  createPhoto,
  CREATE_PHOTO_SUCCESS
} from '@common/actions/photos'

const mapStateToProps = state => ({
  error: state.photos.error
})

const mapDispatchToProps = dispatch => ({
  createPhoto(data) {
    dispatch(createPhoto(data)).then(action => {
      if (action.type === CREATE_PHOTO_SUCCESS) {
        navigate('/admin/photos')
        return
      }

      document.querySelector('.modal').scrollTo(0, 0)
    })
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Create)
