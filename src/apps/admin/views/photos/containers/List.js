import { connect } from 'react-redux'
import { navigate } from '@reach/router'

import List from '../views/List'

import { loadPhotos, LOAD_PHOTOS_ERROR } from '@admin/actions/photos'

const mapStateToProps = state => ({
  photos: state.photos,
  user: state.user
})

const mapDispatchToProps = dispatch => ({
  loadPhotos(params) {
    dispatch(loadPhotos(params)).then(action => {
      if (action.type === LOAD_PHOTOS_ERROR) {
        if (action.status === 404) {
          navigate('/admin/photos')
        }
      }
    })
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(List)
