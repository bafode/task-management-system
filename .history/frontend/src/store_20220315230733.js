import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import {
  taskListReducer,
  taskDetailsReducer,
  taskDeleteReducer,
  taskCreateReducer,
  taskUpdateReducer
} from './reducers/taskReducers'
import {
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
  userUpdateProfileReducer,
  userListReducer,
  userDeleteReducer,
  userUpdateReducer,
} from './reducers/userReducers'
import {
  projectListReducer,
  projectDetailsReducer,
  projectDeleteReducer,
  projectCreateReducer,
  projectUpdateReducer,
} from './reducers/projectReducers'

const reducer = combineReducers({
  projectList: projectListReducer,
  projectDetails: projectDetailsReducer,
  projectDelete: projectDeleteReducer,
  projectCreate: projectCreateReducer,
  projectUpdate: projectUpdateReducer,
  taskList: taskListReducer,
  taskDetails: taskDetailsReducer,
  taskDelete: taskDeleteReducer,
  taskCreate: taskCreateReducer,
  taskUpdate: taskUpdateReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  userUpdate: userUpdateReducer,
  
})


const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null


const initialState = {
    userLogin: { userInfo: userInfoFromStorage },
}

const middleware = [thunk]

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store
