import React, { Component } from 'react';
import './mainView.css';

import BookingList from '../components/bookings/bookingList/bookingList';
import Status from '../components/status/status';
import AddBooking from '../components/addbooking/addBooking';
import Render from '../components/render/render';
import AuthContext from '../context/auth-context';
import { Line } from 'react-chartjs-2';
import GraphModal from '../components/modal/graphModal';
import Backdrop from '../components/modal/backdrop';
import moment from 'moment';

class MainView extends Component {
    state = {
        creating: false,
        bookings: [],
        isLoading: false,
        setDate: new Date().toISOString().slice(0,10),
        addBooking: false,
        charts: false,
        bookingToDelete: null,
        activeBookings: null,
        smallPet: [],
        mediumPet: [],
        largePet: [],
        spaceLeft: 0
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

    setChart = () => {
      this.setState(prevState => ({ charts: !prevState.charts }));
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
            if (booking.petWeight == 'small' ) {
                smallPetArr.push(booking)
            } else if ( booking.petWeight == 'large' ) {
                largePetArr.push(booking)
            } else {
                mediumPetArr.push(booking)
            }
        });
        sortPetsBySize();
        this.setState({bookings: filteredBookings, isLoading: false, activeBookings: filteredBookings.length, smallPet : smallPetArr, mediumPet: mediumPetArr, largePet: largePetArr });
      
        // calculating usage of the floor-room based on size of the pet
        const setSpaceRemaining = () => {         
          let totalCount = 24 - ((this.state.smallPet.length) + (this.state.mediumPet.length * 1.5) + (this.state.largePet.length * 2));
          console.log(this.state.smallPet.length)
          console.log(totalCount)
          return this.setState({ spaceLeft : totalCount }) 
        }
        setSpaceRemaining();
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
setDateMinus = (e) => {
  e.preventDefault()
  //console.log(this.state.setDate)
  const date = new Date(this.state.setDate);
  //console.log(date)
  let newDate= moment(date).format('YYYY-MM-DD');
  //console.log('click', newDate)
   this.setState({ setDate: newDate });
   this.fetchBookings();
};

setDatePlus = (e) => {
  e.preventDefault()
  //console.log(this.state.setDate)
  const date = moment(this.state.setDate);;
  let newDate= moment(date).add(1, 'days')._d;
  let newDayToSet = moment(newDate).format('YYYY-MM-DD')
  //console.log('click', newDate )
  this.setState({ setDate: newDayToSet });
  this.fetchBookings();
};

     render() {
        return (
                
                  <React.Fragment>
                  {this.state.charts && <Backdrop />}
                  {this.state.charts && <GraphModal 
                  title="Charts" 
                  chartSwitch={this.setChart}
                >
                <h3>For :&nbsp;&nbsp; {this.state.customer} </h3>
                <h3> pet name :&nbsp;&nbsp; {this.state.petName}</h3>
                <h3> check in :&nbsp;&nbsp; {this.state.checkIn}</h3>
                </GraphModal>}
                    <div className="dateSelect">
                    <form>
                    <label htmlFor="CheckIn">&nbsp; </label>
                    <button className="btn-days" onClick={this.setDateMinus}>previous</button>
                    <input type="date" id="currentDate" value={this.state.setDate} ref={this.dateElRef} onChange={this.setDate}></input>
                    <button className="btn-days" onClick={this.setDatePlus}>&nbsp;next&nbsp;</button>
                    </form>
                    </div>
                    <div className="maindiv">
                    <div className="renderdiv">
                        <Render renderStatus={this.state.bookings}
                                currentDay={this.state.setDate}
                            />
                    </div>
                    <div className="bookingsdiv">
                    <div className="status">
                        <Status status={this.state.bookings}
                                chartSwitch={this.setChart}
                        />                            
                    </div>
                    {this.state.addBooking}
                    
                    <div className="bookingsRender">            
                    {this.state.addBooking ? (
                        <AddBooking test={this.removeAddBooking} addBooking={this.state.addBooking} available={this.state.spaceLeft}/>
                        
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
                    </React.Fragment>
            
        );
      }
    }

export default MainView;
