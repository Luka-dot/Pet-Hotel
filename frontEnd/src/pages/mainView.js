import React, { Component } from 'react';
import { Redirect, Link } from "react-router-dom";
import './mainView.css';

import BookingList from '../components/bookings/bookingList/bookingList';
import Spinner from '../components/spinner/spinner';
import AuthContext from '../context/auth-context';
const moment = require('moment');

class MainView extends Component {
    state = {
        creating: false,
        bookings: [],
        isLoading: false,
        setDate: new Date().toISOString().slice(0,10),
      };
      constructor(props) {
        super(props);
        this.dateElRef = React.createRef();
        
    }
    componentDidMount() {
        this.fetchBookings()
        const todaysDate = moment();
        const formatedDate = todaysDate.format('YYYY-MM-DD');
        this.setState({setDate : formatedDate})
    }
    
      setDate = () => {
          
          const date = this.dateElRef.current.value;
          console.log(date);
          this.setState({ setDate: date });
          this.fetchBookings();
      };

    //  getting all events.
      fetchBookings() {
          this.setState({isLoading: true});
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
        const filterDate = (this.state.setDate);
        const filteredBookings = bookings.filter(function(book) {
            return book.checkIn == filterDate;
        });
        console.log(filteredBookings)

        this.setState({bookings: filteredBookings, isLoading: false});
      })
    
    .catch(err => {
      console.log(err);
      this.setState({isLoading: false});
    });
  }  
    
      render() {
        return (
                <div>
                    <div className="dateSelect">
                    <form>
                    <label htmlFor="CheckIn">Select Date to Display :&nbsp;&nbsp; </label>
                    <input type="date" id="currentDate" value={this.state.setDate} ref={this.dateElRef} onChange={this.setDate}></input>
                    </form>
                    </div>
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
.then(res => {
      if (res.status !== 200 && res.status !== 201) {
        throw new Error('Failed!');
      }
      return res.json();
    })
    .then(resData => {
        const bookings = resData.data.bookings;
        console.log(bookings)
        this.setState({bookings: bookings, isLoading: false});
      })



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