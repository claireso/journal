import { combineReducers } from 'redux'

import photos from './photos'
import subscriptions from './subscriptions'
import messages from './messages'
import user from './user'

export default combineReducers({
  photos,
  subscriptions,
  messages,
  user
})
