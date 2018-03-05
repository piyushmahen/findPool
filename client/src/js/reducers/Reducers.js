import { combineReducers } from 'redux';

import LoginReducer from './login/LoginReducer'
import RegisterReducer from './register/RegisterReducer'
import FindRideReducer from './find-ride/FindRideReducer'

export default combineReducers({
  LoginReducer,
  RegisterReducer,
  FindRideReducer,
});