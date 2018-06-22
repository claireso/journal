import { connect } from 'react-redux'

import List from '../views/List'

import { loadPhotos } from '../../../../common/actions/photos'

const mapStateToProps = (state) => ({
  photos : state.photos
})

const mapDispatchToProps = (dispatch) => ({
  loadPhotos() {
    dispatch(loadPhotos())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(List)
