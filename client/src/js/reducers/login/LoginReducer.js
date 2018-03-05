import { actionTypes } from '../../actions/login/LoginActions';

const initialState = {
  username: '',
  password: '',
  isLoading: false,
  errorMessage: '',
  isError: false,
};

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.HANDLE_USERNAME_CHANGE:
      return { ...state, username: action.payload };
    case actionTypes.HANDLE_PASSWORD_CHANGE:
      return { ...state, password: action.payload };
    case actionTypes.START_LOADING:
      return { ...state, isLoading: true, isError: false };
    case actionTypes.HANDLE_LOGIN_ERROR:
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorMessage: action.payload,
      };
    default:
      return state;
  }
};

export default loginReducer;