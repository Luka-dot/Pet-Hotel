import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import grassPicture from '../assets/grass.jpg';
import './landing.css'

class LandingPage extends Component {
    constructor(props) {
    super(props)

        this.state = {
            email: '',
            password: '',
            isLogged: false
        }
        console.log('checking state on landing page ', this.state)
        this.switchModeHandler = this.switchModeHandler.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
  };


  switchModeHandler = () => {
    this.setState(prevState => {
      return { isLogin: !prevState.isLogin };
    });
  };

  submitHandler = event => {
    
    event.preventDefault();
    let requestBody = {
        query: `
          query {
            login(email: "${this.state.email}", password: "${this.state.password}") {
              userId
              token
            }
          }
        `
      };

    // check for empty fields
    
    if (this.state.email.length === 0 || this.state.password.length === 0) {
      return console.log('email or password can not be left empty');
    } else {
        this.props.fetchLogIn((requestBody))
        this.setState({email: ''})
        this.setState({password: ''})
    }

    // let requestBody = {
    //   query: `
    //     query {
    //       login(email: "${this.email}", password: "${this.password}") {
    //         userId
    //         token
    //         tokenExpiration
    //       }
    //     }
    //   `
    // };

    // if (!this.state.isLogin) {
    //   requestBody = {
    //     query: `
    //       mutation {
    //         createUser(userInput: {email: "${this.email}", password: "${this.password}"}) {
    //           _id
    //           email
    //         }
    //       }
    //     `
    //   };
    // }

    // fetch('http://localhost:8000/graphql', {
    //   method: 'POST',
    //   body: JSON.stringify(requestBody),
    //   headers: {
    //     'Content-Type': 'application/json'
    //   }
    // })
    //   .then(res => {
    //     if (res.status !== 200 && res.status !== 201) {
    //       throw new Error('Log in has Failed!');
    //     }
    //     return res.json();
    //   })
    //   .then(resData => {
    //     console.log(resData, 'user is logged in');
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   });
 

  };
  render() {
    return (
      <form className="auth-form" onSubmit={this.submitHandler}>
        <div className="form-control">
          <label htmlFor="email">E-Mail   test11@test.com</label>
          <input type="email" id="email" onChange={event => this.setState({email: event.target.value})} />
        </div>
        <div className="form-control">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" onChange={event => this.setState({password: event.target.value})} />
        </div>
        <div className="form-actions">
          <button type="submit" onClick={this.submitHandler}>Submit</button>
        </div>
      </form>
    );
  }
}

export default connect(
    null,
    actions
  )(LandingPage);

//  <img className="Login-component" src={grassPicture} />

/*
class LandingPage extends Component {
    state = {
    isLogin: true
  };

  constructor(props) {
    super(props);
    this.emailEl = React.createRef();
    this.passwordEl = React.createRef();
  }

  switchModeHandler = () => {
    this.setState(prevState => {
      return { isLogin: !prevState.isLogin };
    });
  };

  submitHandler = event => {
    event.preventDefault();
    const email = this.emailEl.current.value;
    const password = this.passwordEl.current.value;

    if (email.trim().length === 0 || password.trim().length === 0) {
      return;
    }

    let requestBody = {
      query: `
        query {
          login(email: "${email}", password: "${password}") {
            userId
            token
            tokenExpiration
          }
        }
      `
    };

    if (!this.state.isLogin) {
      requestBody = {
        query: `
          mutation {
            createUser(userInput: {email: "${email}", password: "${password}"}) {
              _id
              email
            }
          }
        `
      };
    }

    fetch('http://localhost:8000/graphql', {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error('Log in has Failed!');
        }
        return res.json();
      })
      .then(resData => {
        console.log(resData, 'user is logged in');
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    return (
      <form className="auth-form" onSubmit={this.submitHandler}>
        <div className="form-control">
          <label htmlFor="email">E-Mail</label>
          <input type="email" id="email" ref={this.emailEl} />
        </div>
        <div className="form-control">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" ref={this.passwordEl} />
        </div>
        <div className="form-actions">
          <button type="submit" onClick={this.handleSubmit}>Submit</button>
        </div>
      </form>
    );
  }
}

export default LandingPage;
*/