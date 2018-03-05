import { actionTypes } from '../../actions/register/RegisterActions';

const initialState = {
  name: {value: '', isUsed: false},
  email: {value: '', isUsed: false},
  mobile: {value: '', isUsed: false},
  password: {value: '', isUsed: false},
  confirmPassword: {value: '', isUsed: false},
  car: {value: '', isUsed: false},
  isLoading: false,
  errorMessage: '',
  isError: false,
};

const registerReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.HANDLE_CHANGE:
      return { ...state, [action.payload.key]: {...state[action.payload.key], value: action.payload.value} };
    case actionTypes.MARK_BLUR:
      return { ...state, [action.payload]: {...state[action.payload], isUsed: true} };
    case actionTypes.START_LOADING:
      return { ...state, isLoading: true, isError: false };
    case actionTypes.HANDLE_REGISTER_ERROR:
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

export default registerReducer;