import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Register from '../../presentational/register/Register';
import { actionTypes, actionMethods } from '../../actions/register/RegisterActions';

let mapStateToProps = (store) => ({
    name: store.RegisterReducer.name,
    email: store.RegisterReducer.email,
    mobile: store.RegisterReducer.mobile,
    password: store.RegisterReducer.password,
    confirmPassword: store.RegisterReducer.confirmPassword,
    car: store.RegisterReducer.car,
    isLoading: store.RegisterReducer.isLoading,
    isError: store.RegisterReducer.isError,
    errorMessage: store.RegisterReducer.errorMessage,
  });

let mapDispatchToProps = (dispatch) => {
  const {
    handleChange,
    markBlur,
    handleRegisterForm
  } = actionMethods;

  return bindActionCreators(
    {
      handleChange,
      markBlur,
      handleRegisterForm
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);