
import registerFetchApi from '../../services/register/RegisterServices';
import { history } from '../../Routes';

const actionTypes = {
  HANDLE_CHANGE: 'Register/HANDLE_CHANGE',
  MARK_BLUR: 'Register/MARK_BLUR',
  HANDLE_REGISTER_FORM: 'Register/HANDLE_REGISTER_FORM',
  START_LOADING: 'Register/START_LOADING',
  HANDLE_REGISTER_ERROR: 'Register/HANDLE_REGISTER_ERROR',
};

const actionMethods = {
  handleChange: (payload) => ({ type: actionTypes.HANDLE_CHANGE, payload }),
  markBlur: (payload) => ({ type: actionTypes.MARK_BLUR, payload }),
  startLoading: () => ({ type: actionTypes.START_LOADING }),
  handleRegisterError: (payload) => ({ type: actionTypes.HANDLE_REGISTER_ERROR, payload }),
  handleRegisterForm: () => (dispatch, getState) => {
    dispatch(actionMethods.startLoading());
    const { name, email, mobile, password, car } = getState().RegisterReducer;
    const registerObject = {
      name: name.value,
      mobile: mobile.value,
      email: email.value,
      password: password.value,
      car: car.value,
    };
    registerFetchApi(registerObject)
    .then((response) => {
      if (response.error) {
        dispatch(actionMethods.handleRegisterError(response.message));
      } else {
        history.push('/');
      }
    });
  },
};

export { actionTypes, actionMethods };
