import React, { Component } from 'react';
import { Link } from 'react-router';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';
import TextField from 'material-ui/TextField';
import { CircularProgress } from 'material-ui/Progress';
import { withStyles } from 'material-ui/styles';

const style = {
  paper: {
    textAlign: 'center',
    padding: '25px',
    margin: '20px'
  },
  input: {
    padding: '20px',
  },
  mainContainer: {
    textAlign: 'center',
  },
};

class Login extends Component {

  static propTypes = {
    username: PropTypes.string,
    password: PropTypes.string,
    handleUsernameChange: PropTypes.func.isRequired,
    handlePasswordChange: PropTypes.func.isRequired,
    handleLoginForm: PropTypes.func.isRequired,
    classes: PropTypes.object,
    isError: PropTypes.bool,
    isLoading: PropTypes.bool,
    errorMessage: PropTypes.string,
  };

  handleUsernameChange = (e) => this.props.handleUsernameChange(e.target.value);

  handlePasswordChange = (e) => this.props.handlePasswordChange(e.target.value);

  submitLoginForm = (e) => this.props.handleLoginForm();

  render(){
    const { classes, username, password, isLoading, isError, errorMessage } = this.props;
    return(
      <Grid style={style.mainContainer} item xs={12} md={8} lg={6}>
        <Paper style={style.paper}>
        <Grid style={style.input}>
          <TextField label="Username" placeholder="10 digit mobile number or Email Id" fullWidth onChange={this.handleUsernameChange} value={username} />
        </Grid>
        <Grid style={style.input}>
          <TextField label="Password" type="password" fullWidth onChange={this.handlePasswordChange} value={password} />
        </Grid>
        <Button onClick={this.submitLoginForm} disabled={!username || !password || isLoading} variant="raised" color="primary">
          {
            isLoading ? <CircularProgress size={20} /> : 'Login'
          }
        </Button>
        {
          isError && <p>{errorMessage}</p>
        }
        </Paper>
        <p>Don't have an account? <Link to="/register">REGISTER NOW</Link></p>
      </Grid>
    );
  };
}

export default Login;
