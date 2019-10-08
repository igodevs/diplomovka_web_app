import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import './assets/css/style.css';
import Router from './Router';
import * as serviceWorker from './serviceWorker';
import { reducers } from './reducers';

const logger = createLogger();

ReactDOM.render(
  <Provider
    store={createStore(reducers, {}, applyMiddleware(logger, thunkMiddleware))}
  >
    <Router />
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
