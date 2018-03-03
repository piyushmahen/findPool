import { applyMiddleware, createStore } from 'redux';
// #if process.env.NODE_ENV !== 'production'
import reduxLogger from 'redux-logger';
// #endif
import thunk from 'redux-thunk';

import reducer from '../reducers/Reducers';

let middleware = [thunk];
if (process.env.NODE_ENV !== 'production') {
  middleware = [...middleware, reduxLogger];
}

export default createStore(reducer, applyMiddleware(...middleware));