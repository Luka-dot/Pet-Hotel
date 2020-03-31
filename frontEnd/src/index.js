import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import promise from 'redux-promise';
import './index.css';
import LandingPage from './components/landingPage';
import MainView from './components/mainView';
import Booking from './components/booking';
import { createStore, applyMiddleware, compose } from 'redux';
import allReducer from './reducers';
import { Provider } from 'react-redux';

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);
// (window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());


ReactDOM.render(
  <Provider store={createStoreWithMiddleware(allReducer)}>
    <BrowserRouter>
      <Switch>
        <Route path="/" component={LandingPage} exact />
        <Route path="/mainView" component={MainView}  />
        <Route path="/booking" component={Booking}  />      
      </Switch>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);


