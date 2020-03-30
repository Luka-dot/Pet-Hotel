import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import ReduxPromise from 'redux-promise';
import './index.css';
import LandingPage from './pages/landingPage';
import { createStore, applyMiddleware } from 'redux';
import allReducer from './reducers';
import { Provider } from 'react-redux';

const store = applyMiddleware(createStore)(ReduxPromise)(allReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route path="/" component={LandingPage} />
  
    
      </Switch>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);


