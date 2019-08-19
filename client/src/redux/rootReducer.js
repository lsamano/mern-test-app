import { combineReducers } from 'redux'
import projectReducer from './projectReducer'
import userReducer from './userReducer'

export default combineReducers({
  projectReducer,
  userReducer
})
