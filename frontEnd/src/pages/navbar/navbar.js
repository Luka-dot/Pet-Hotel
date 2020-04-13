import React from 'react';
import { NavLink, Link } from 'react-router-dom';

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
                <React.Fragment>
                  <li>
                    <Link to="/"><button id="log-out-button" onClick={context.logout} >Logout</button></Link>
                  </li>
                </React.Fragment>             
            </ul>
          </nav>
        </header>
      );
    }}
  </AuthContext.Consumer>
);


export default navBar;