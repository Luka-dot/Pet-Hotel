import React, { Component } from 'react';
import { Redirect, Link } from "react-router-dom";
import './mainView.css';

import BookingList from '../components/bookings/bookingList/bookingList';
import Status from '../components/status/status';
import AddBooking from '../components/addbooking/addBooking';
import Render from '../components/render/render';
import Spinner from '../components/spinner/spinner';
import AuthContext from '../context/auth-context';
const moment = require('moment');

class MainView extends Component {
    state = {
        creating: false,
        bookings: [],
        isLoading: false,
        setDate: new Date().toISOString().slice(0,10),
        addBooking: false,
        bookingToDelete: null,
        activeBookings: null,
        selectedBooking: null,
        smallPet: [],
        mediumPet: null,
        largePet: null
      };

      static contextType = AuthContext;
      
      constructor(props) {
        super(props);
        this.dateElRef = React.createRef();
        
    }
    componentDidMount() {
        this.fetchBookings()
        const todaysDate = moment();
        const formatedDate = todaysDate.format('YYYY-MM-DD');
        this.setState({setDate : formatedDate})
        this.setState({addBooking: false})
    }
    
    setDate = () => {
        const date = this.dateElRef.current.value;
        this.setState({ setDate: date });
        this.fetchBookings();
    };

    setAddBooking = () => {
        this.setState({addBooking: true});
    }

    removeAddBooking() {
        this.setState({addBooking: false});
    }

    showDetailHandler = (e) => {
        let bookingToCancel = e.target.value
        console.log('ID of booking to cancel ',bookingToCancel)
        this.setState({bookingToDelete: bookingToCancel})
        
        this.deleteBooking(bookingToCancel)   
    };
    

    //************GET BOOKINGS  ***************************/
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
                    petWeight
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
            return book.checkIn <= filterDate && book.checkOut > filterDate;
        });
        // lets figure out 3 variables, each holding pets with proper size
        let smallPetArr = [];
        let mediumPetArr = [];
        let largePetArr = [];
        // map bookings and push pets to appropriate array
        const sortPetsBySize = () => filteredBookings.map(booking =>{
            if (booking.petWeight < 21 ) {
                smallPetArr.push(booking)
            } else if ( booking.petWeight >= 70 ) {
                largePetArr.push(booking)
            } else {
                mediumPetArr.push(booking)
            }
        });
        sortPetsBySize();

        this.setState({bookings: filteredBookings, isLoading: false, activeBookings: filteredBookings.length, smallPet : smallPetArr, mediumPet: mediumPetArr, largePet: largePetArr });
      })
    
    .catch(err => {
      console.log(err);
      this.setState({isLoading: false});
    });
}
    
//   *********************DELETE Bookings
deleteBooking(idValue) {
   
    console.log('inside delete fetch ', idValue)
    const requestBody = {
      query: `
      mutation CancelBooking($id: ID!) {
          cancelBooking(bookingId: $id) {
          _id
          customer
          }
        }
      `,
      variables: {
          id: idValue
        }
    }
      
      fetch('http://localhost:8000/graphql', {
         method: 'POST',
          body: JSON.stringify(requestBody),
          headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + this.context.token
        }
    })
      .then(res => {
          if (res.status !== 200 && res.status !== 201) {
          throw new Error('Failed!');
      }
      return res.json();
  })
  .then(resData => {
        console.log('booking was deleted ',resData);
        let newArray = this.state.bookings.filter(el => el._id != idValue);
        this.setState({bookings: newArray})
        this.setState({bookingToDelete: null})
      return
  })
  .catch(err => {
      console.log(err);
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
                    <div className="renderdiv">
                        <Render renderStatus={this.state.bookings} />
                    </div>
                    <div className="bookingsdiv">
                    <div className="status">
                        <Status status={this.state.bookings}/>                            
                    </div>
                    {this.state.addBooking}
                    
                    <div className="bookingsRender">            
                    {this.state.addBooking ? (
                        <AddBooking test={this.removeAddBooking} addBooking={this.state.addBooking}/>
                        
                    ) : (
                        <React.Fragment>
                        <div className="btn-holder">
                        <button id="addbtn" onClick={this.setAddBooking} > Add Booking</button>
                        </div>
                        <BookingList 
                                bookings={this.state.bookings}
                                onViewDetail={this.showDetailHandler}
                                        />
                        </React.Fragment>
                    )}
                    </div>
                    </div>
                    </div>
                </div>
            
        );
      }
    }

export default MainView;
