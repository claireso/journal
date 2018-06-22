import { combineReducers } from 'redux'

import photos from './photos'
import subscriptions from './subscriptions'

export default combineReducers({
  photos,
  subscriptions
})