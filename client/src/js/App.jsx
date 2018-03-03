import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { render } from 'react-dom';

import { Provider, connect } from 'react-redux';
import Store from './store/Store';
import Routes from './Routes';

class App extends Component {
  static propTypes = {
    children: PropTypes.object,
  };

  static defaultProps = {
    children: {},
  };

  render() {
    return (
      <div>
      {this.props.children}
      </div>
    );
  }
}

render(<Provider store={Store}><Routes app={App} /></Provider>, document.getElementById('container'));
