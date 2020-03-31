import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import promise from 'redux-promise';
import './index.css';
import LandingPage from './components/landingPage';
import { createStore, applyMiddleware, compose } from 'redux';
import allReducer from './reducers';
import { Provider } from 'react-redux';

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);
// (window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());


ReactDOM.render(
  <Provider store={createStoreWithMiddleware(allReducer)}>
    <BrowserRouter>
      <Switch>
        <Route path="/" component={LandingPage} />
  
    
      </Switch>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);


