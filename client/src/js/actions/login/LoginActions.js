
import loginFetchApi from '../../services/login/LoginServices';
import { history } from '../../Routes';

const actionTypes = {
  HANDLE_USERNAME_CHANGE: 'LOGIN/HANDLE_USERNAME_CHANGE',
  HANDLE_PASSWORD_CHANGE: 'LOGIN/HANDLE_PASSWORD_CHANGE',
  HANDLE_LOGIN_FORM: 'LOGIN/HANDLE_LOGIN_FORM',
  START_LOADING: 'LOGIN/START_LOADING',
  HANDLE_LOGIN_ERROR: 'LOGIN/HANDLE_LOGIN_ERROR',
};

const actionMethods = {
  handleUsernameChange: (payload) => ({ type: actionTypes.HANDLE_USERNAME_CHANGE, payload }),
  handlePasswordChange: (payload) => ({ type: actionTypes.HANDLE_PASSWORD_CHANGE, payload }),
  startLoading: () => ({ type: actionTypes.START_LOADING }),
  handleLoginError: (payload) => ({ type: actionTypes.HANDLE_LOGIN_ERROR, payload }),
  handleLoginForm: () => (dispatch, getState) => {
    dispatch(actionMethods.startLoading());
    const { username, password } = getState().LoginReducer;
    loginFetchApi({ username, password })
    .then((response) => {
      if (response.error) {
        dispatch(actionMethods.handleLoginError(response.message));
      } else {
        history.push('/');
      }
    });
  },
};

export { actionTypes, actionMethods };
