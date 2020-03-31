import React from 'react';
import { NavLink } from 'react-router-dom';

// import AuthContext from '../../context/auth-context';
import './navbar.css';

const navBar = props => (
    
          <header className="main-navigation">
            <div className="main-navigation__logo">
              <h1>Sit & Stay</h1>
            </div>
            <nav className="main-navigation__items">
              <ul>
                
                  <li>
                    <NavLink to="/">Log In</NavLink>
                  </li>
                
                <li>
                  <NavLink to="/mainView">Main</NavLink>
                </li>
                
                  <React.Fragment>
                    <li>
                      <NavLink to="/booking">Bookings</NavLink>
                    </li>
                  </React.Fragment>
               
              </ul>
            </nav>
          </header>
        );

  
  export default navBar;