import React, { Component } from 'react';
import { Redirect, Link } from "react-router-dom";
import './mainView.css';

import BookingList from '../components/bookings/bookingList/bookingList';
import Spinner from '../components/spinner/spinner';
import AuthContext from '../context/auth-context';


class MainView extends Component {
    state = {
        creating: false,
        bookings: []
      };
    
    componentDidMount() {
        this.fetchBookings()
    }

      startCreateEventHandler = () => {
        // this.setState({ creating: true });
      };

    //  getting all events.
      fetchBookings() {
        const requestBody = {
            query: `
            query {
                bookings {
                    _id
                    customer
                    checkIn
                    checkOut
                    price
                    date
                    petName
                    petType
                    note
            }
          }
      `,

        }
  const token = this.context.token;

  fetch('http://localhost:8000/graphql', {
    method: 'POST',
    body: JSON.stringify(requestBody),
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token
    }
  })
    .then(res => {
      if (res.status !== 200 && res.status !== 201) {
        throw new Error('Failed!');
      }
      return res.json();
    })
    .then(resData => {
        const bookings = resData.data.bookings;
        this.setState({bookings: bookings});
      })
    
    .catch(err => {
      console.log(err);
    });
  }  
    
      render() {
        return (
            
                <div>
                    <h1> MAIN PAGE </h1>
                    <div className="maindiv">
                    <div className="renderdiv">this will be floor plan render</div>
                    <div className="bookingsdiv">this will be right side app render
                    <div className="status">this will be status component</div>
                    <Link to={'/booking'}><button className="addbtn" > Add Booking</button></Link>
                    <div className="bookingsRender">                   
                        {this.state.isLoading ? (
                        <Spinner />
                        ) : (
                        <BookingList bookings={this.state.bookings} />
                        )}
                    </div>
                    </div>
                    </div>
                </div>
            
        );
      }
    }

export default MainView;


/*
render() {
        return(
            <div>
                <h1> MAIN PAGE </h1>
                <div className="maindiv">
                <div className="renderdiv">this will be floor plan render</div>
                <div className="bookingsdiv">this will be right side app render
                <div className="status">this will be status component</div>
                <button> Add Booking</button>
                <div className="bookingsRender">this where bookings will be rendered
               
                        {this.state.isLoading ? (
                    <Spinner />
                    ) : (
                    <ul className="bookings__list">
                        {bookingList} 
                        </ul>
                    )}
            
                </div>
                </div>
                </div>
            </div>
        );
    }
*/