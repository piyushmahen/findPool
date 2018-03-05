import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { render } from 'react-dom';
import { history } from './Routes';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import DirectionsCar from 'material-ui-icons/DirectionsCar';

import { Provider, connect } from 'react-redux';
import Store from './store/Store';
import Routes from './Routes';

const style = {
  mainContainer: {
    paddingTop: '64px',
  },
  loginButton: {
    position: 'absolute',
    right: '20px',
  },
  toolbar: {
    minHeight: '64px',
  }
};

class App extends Component {
  static propTypes = {
    children: PropTypes.object,
  };

  static defaultProps = {
    children: {},
  };

  render() {
    return (
      <Grid style={style.mainContainer} container spacing={24} justify="center">
        <AppBar>
          <Toolbar style={style.toolbar}>
            <IconButton color="inherit" aria-label="Logo">
              <DirectionsCar />
            </IconButton>
            <Typography variant="title" color="inherit">
            {(() => {
              if (this.props.location.pathname === '/register') {
                return 'Register to findPool';
              }
              if (this.props.location.pathname === '/') {
                return 'Pick A Ride';
              }
              if (this.props.location.pathname === '/login') {
                return 'Login to findPool'
              }
              return 'Welcome to findPool'
            })()}
            </Typography>
            {(() => {
              if (this.props.location.pathname === '/register') {
                return <Button onClick={() => history.push('/login')} style={style.loginButton} color="inherit">Login</Button>
              }
              if (this.props.location.pathname === '/login') {
                return <Button onClick={() => history.push('/register')} style={style.loginButton} color="inherit">Register</Button>
              }
              return <Button onClick={() => window.location.href="/logout"} style={style.loginButton} color="inherit">Logout</Button>
            })()}
          </Toolbar>
        </AppBar>
        {this.props.children}
      </Grid>
    );
  }
}

render(<Provider store={Store}><Routes app={App} /></Provider>, document.getElementById('container'));
