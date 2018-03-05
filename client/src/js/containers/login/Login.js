import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Login from '../../presentational/login/Login';
import { actionTypes, actionMethods } from '../../actions/login/LoginActions';

let mapStateToProps = (store) => ({
    username: store.LoginReducer.username,
    password: store.LoginReducer.password,
    isLoading: store.LoginReducer.isLoading,
    isError: store.LoginReducer.isError,
    errorMessage: store.LoginReducer.errorMessage,
  });

let mapDispatchToProps = (dispatch) => {
  const {
    handleUsernameChange,
    handlePasswordChange,
    handleLoginForm
  } = actionMethods;

  return bindActionCreators(
    {
      handleUsernameChange,
      handlePasswordChange,
      handleLoginForm
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);