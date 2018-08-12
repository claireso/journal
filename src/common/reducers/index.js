import { combineReducers } from 'redux'

import photos from './photos'
import subscriptions from './subscriptions'
import api from './api'
import user from './user'

export default combineReducers({
  photos,
  subscriptions,
  api,
  user
})
