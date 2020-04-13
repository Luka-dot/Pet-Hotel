import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';

import AuthPage from './pages/auth';
import MainView from './pages/mainView';
import NavBar from './pages/navbar/navbar';
import AuthContext from './context/auth-context';

import './App.css';
// storing token here and distributing it thru AuthContext to other components 
class App extends Component {
  state = {
    token: null,
    userId: null
  };

  login = (token, userId, tokenExpiration) => {
    this.setState({ token: token, userId: userId });
  };

  logout = () => {
    this.setState({ token: null, userId: null });
  };

  render() {
    return (
      <BrowserRouter>
        <React.Fragment>
          <AuthContext.Provider
            value={{
              token: this.state.token,
              userId: this.state.userId,
              login: this.login,
              logout: this.logout
            }}
          >
            <NavBar />
            <main className="main-content">
              <Switch>
                {this.state.token && <Redirect from="/" to="/auth" exact />}
                {this.state.token && (
                  <Redirect from="/auth" to="/mainview" exact />
                )}
                {!this.state.token && (
                  <Route path="/auth" component={AuthPage} />
                )}
                <Route path="/mainview" component={MainView} />                
                {!this.state.token && <Redirect to="/auth" exact />}
              </Switch>
            </main>
          </AuthContext.Provider>
        </React.Fragment>
      </BrowserRouter>
    );
  }
}

export default App;