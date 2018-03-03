/*
 * Copyright (c) 2017.
 * This  code file/snippet/block, including any other configuration files,
 * is for the sole use of the Evive Health, LLC and may contain business
 * confidential and privileged information.
 * Any unauthorized review, use, disclosure or distribution is prohibited.
 */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { IndexRoute, Router, Route, useRouterHistory } from 'react-router';
import { connect } from 'react-redux';
import { createHistory } from 'history';

const history = useRouterHistory(createHistory)();


class Routes extends PureComponent {

  static propTypes = {
    app: PropTypes.func.isRequired,
  };

  render() {
    return (
      <Router history={history}>
        <Route path="/" component={this.props.app}>
          <IndexRoute component={() => <div>hey</div>} />
        </Route>

      </Router>
    );
  }
}

export default Routes;