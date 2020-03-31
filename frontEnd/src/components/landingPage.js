import React, { Component } from 'react';
import grassPicture from '../assets/grass.jpg';
import './landing.css'

class LandingPage extends Component {
    render() {
        return(
            <div className="Login-component">
                <h1> This is landing page </h1>
                <form className="loginForm">
                    <textarea>Username</textarea>
                    <textarea>Password</textarea>
                    <button>Submit</button>
                </form>
            </div>
        );
    }
}

export default LandingPage;

//  <img className="Login-component" src={grassPicture} />