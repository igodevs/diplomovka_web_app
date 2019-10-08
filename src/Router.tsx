import React from 'react';
import { Router } from 'react-router-dom';
import history from './history';
import App from './App';

const RouterComponent = () => {
  return (
    <Router history={history}>
      <App />
    </Router>
  );
};

export default RouterComponent;
