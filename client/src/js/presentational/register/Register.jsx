import React, { Component } from 'react';
import { Link } from 'react-router';
import memoize from 'lodash.memoize';
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

const emailRegex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

class Register extends Component {

  static propTypes = {
    name: PropTypes.object,
    email: PropTypes.object,
    mobile: PropTypes.object,
    password: PropTypes.object,
    confirmPassword: PropTypes.object,
    car: PropTypes.object,
    handleChange: PropTypes.func.isRequired,
    markBlur: PropTypes.func.isRequired,
    handleRegisterForm: PropTypes.func.isRequired,
    classes: PropTypes.object,
    isError: PropTypes.bool,
    isLoading: PropTypes.bool,
    errorMessage: PropTypes.string,
  };

  handleChange = (key) => (e) => this.props.handleChange({ key, value: e.target.value });

  onBlurMarkUsed = (key) => (e) => !this.props[key].isUsed && this.props.markBlur(key);

  submitRegisterForm = (e) => this.props.handleRegisterForm();

  checkFormValid =  (name, email, mobile, password, confirmPassword) => {
      if (!name ||
        !emailRegex.test(email) ||
        !mobile || isNaN(mobile) || mobile.length !== 10 ||
        !password || password.length < 6 || confirmPassword !== password) {
        return false;
      }
      return true;
    };

  render(){
    const { classes, name, email, mobile, password, confirmPassword, car, isLoading, isError, errorMessage } = this.props;
    return(
      <Grid style={style.mainContainer} item xs={12} md={8} lg={6}>
        <Paper style={style.paper}>
        <Grid style={style.input}>
          <TextField label="Full Name" onBlur={this.onBlurMarkUsed('name')} placeholder="Enter your first name and last name" fullWidth onChange={this.handleChange('name')} value={name.value} />
        </Grid>
        <Grid style={style.input}>
          <TextField label="Email Id" error={email.isUsed && !emailRegex.test(email.value)} onBlur={this.onBlurMarkUsed('email')} placeholder="Enter your email id" fullWidth onChange={this.handleChange('email')} value={email.value} />
        </Grid>
        <Grid style={style.input}>
          <TextField label="Mobile Number" error={mobile.isUsed && (isNaN(mobile.value) || mobile.value.length !== 10)} onBlur={this.onBlurMarkUsed('mobile')} placeholder="Enter your 10-digit mobile number" fullWidth onChange={this.handleChange('mobile')} value={mobile.value} />
        </Grid>
        <Grid style={style.input}>
          <TextField label="Password" onBlur={this.onBlurMarkUsed('password')} helperText={password.isUsed && password.value.length < 6 ? 'Password should be minumum 6 charachters' : 'minimum 6 digits'} error={password.isUsed && password.value.length < 6} type="password" placeholder="Set your password" fullWidth onChange={this.handleChange('password')} value={password.value} />
        </Grid>
        <Grid style={style.input}>
          <TextField label="Re-enter Password" onBlur={this.onBlurMarkUsed('confirmPassword')} type="password" helperText={confirmPassword.isUsed && confirmPassword.value !== password.value ? 'Re-entered password should match password' : undefined} error={confirmPassword.isUsed && confirmPassword.value !== password.value} placeholder="Re-enter your password" fullWidth onChange={this.handleChange('confirmPassword')} value={confirmPassword.value} />
        </Grid>
        <Grid style={style.input}>
          <TextField label="Car Model" onBlur={this.onBlurMarkUsed('car')} placeholder="Name of car type" fullWidth onChange={this.handleChange('car')} value={car.value} />
        </Grid>
        <Button onClick={this.submitRegisterForm} disabled={isLoading || !this.checkFormValid(name.value, email.value, mobile.value, password.value, confirmPassword.value)} variant="raised" color="primary">
          {
            isLoading ? <CircularProgress size={20} /> : 'Register'
          }
        </Button>
        {
          isError && <p>{errorMessage}</p>
        }
        </Paper>
        <p>Already have an account? <Link to="/login">LOGIN NOW</Link></p>
      </Grid>
    );
  };
}

export default Register;
