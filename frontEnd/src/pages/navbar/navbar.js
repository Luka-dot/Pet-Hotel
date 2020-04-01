import React from 'react';
import { NavLink } from 'react-router-dom';

import AuthContext from '../../context/auth-context';
import './navbar.css';

const navBar = props => (
  <AuthContext.Consumer>
    {context => {
      return (
        <header className="main-navigation">
          <div className="main-navigation__logo">
            <h1>Sit & Stay</h1>
          </div>
          <nav className="main-navigation__items">
            <ul>
              {!context.token && (
                <li>
                  <NavLink to="/">Need Authenticate</NavLink>
                </li>
              )}
              {context.token && (
                <React.Fragment>
                  <li>
                    <NavLink to="/mainView">Main</NavLink>
                  </li>
                  <li>
                    <NavLink to="/booking">Booking</NavLink>
                  </li>
                  <li>
                    <button onClick={context.logout} >Logout</button>
                  </li>
                </React.Fragment>
              )}
            </ul>
          </nav>
        </header>
      );
    }}
  </AuthContext.Consumer>
);


export default navBar;