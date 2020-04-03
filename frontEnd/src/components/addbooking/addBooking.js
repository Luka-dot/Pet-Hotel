import React, { Component } from 'react';

import Modal from '../modal/modal';
import Backdrop from '../modal/backdrop';
import Spinner from '../spinner/spinner';
import AuthContext from '../../context/auth-context';


class addSingleBooking extends Component {
    state = {
        creating: false,
        isLoading: false,
        setDate: null,
        customer: '',
        checkIn: '',
        petName: ''
    };
    

    // contextType is passed so we have access to token that needs to be attached to create booking
    static contextType = AuthContext;

    constructor(props) {
        super(props);
        this.dateElRef = React.createRef();   
        this.customerElRef = React.createRef();
        this.checkInElRef = React.createRef();
        this.checkOutElRef = React.createRef();
        this.priceElRef = React.createRef();
        this.petNameElRef = React.createRef();
        this.petTypeElRef = React.createRef();
        this.petWeightElRef = React.createRef();
        this.noteElRef = React.createRef();
    }

    // when Add Booking is submitted changing state so Modal pops up
    submittedBookingHandler = () => {
        this.setState({creating: true})
    }

    modalCancelHandler = () => {
        this.setState({ creating: false });
        // need revert to mainView page
        window.location.reload(true);
      };

    setDate = () => {
        const date = this.dateElRef.current.value;
        this.setState({ setDate: date });
        // this.fetchBookings();
    };
    
    confirmHandler = (e) => {
         e.preventDefault()
        const customer = this.customerElRef.current.value;
        const checkIn = (this.checkInElRef.current.value);
        const checkOut = (this.checkOutElRef.current.value);
        const price = +this.priceElRef.current.value;
        const date = new Date();
        const petName = this.petNameElRef.current.value;
        const petType = this.petTypeElRef.current.value;
        const petWeight = +this.petWeightElRef.current.value;
        const note = this.noteElRef.current.value;

        this.setState({customer: customer, checkIn: checkIn, petName: petName})
        // add validation here if enough time
        const booking = {customer, checkIn, checkOut, price, date, petName, petType, petWeight, note};
        console.log('checking if booking was created ', booking)

        // need attach token to request. Back end requires token middleware/isAuth.js
        const token = this.context.token;

        const requestBody = {
              query: `
              mutation {
                createBooking(bookingInput:{customer:"${customer}", checkIn:"${checkIn}", checkOut:"${checkOut}", price: ${price}, date:"${date}", petName:"${petName}", petType: "${petType}", petWeight: ${petWeight}, note:"${note}"}) {
                  customer
                  checkIn
                  checkOut
                  price
                  petName
                  petType
                  petWeight
                  note
                }
              }
              `
            };
      
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
                console.log(resData.data);
                this.setState({creating: true})
                

            })
            .catch(err => {
              console.log(err);
            });
    }
    render() {
        return (
            <React.Fragment>
            {this.state.creating && <Backdrop />}
            {this.state.creating && <Modal 
                title="Booking created" 
                canCancel
                onCancel={this.modalCancelHandler}
                customer ={this.customerElRef}
                >
                <h3>For :&nbsp;&nbsp; {this.state.customer} </h3>
                <h3> pet name :&nbsp;&nbsp; {this.state.petName}</h3>
                <h3> check in :&nbsp;&nbsp; {this.state.checkIn}</h3>
                </Modal>}
            <div>
                                
              <div className="form-control">
                        
                    <form>
                            <div className="form-control">
                                <label htmlFor="Customer-name">Customer name</label>
                                <input type="text" id="customer-name" ref={this.customerElRef}></input>
                            </div>
                            <div className="form-control">
                                <label htmlFor="CheckIn">CheckIn</label>
                                <input type="date" id="checkIn" ref={this.checkInElRef}></input>
                            </div>
                            <div className="form-control">
                                <label htmlFor="CheckOut">CheckOut</label>
                                <input type="date" id="checkOut" ref={this.checkOutElRef}></input>
                            </div>
                            <div className="form-control">
                                <label htmlFor="price">Price</label>
                                <input type="float" id="price" ref={this.priceElRef}></input>
                            </div>
                            <div className="form-control">
                                <label htmlFor="pet-name">pet name</label>
                                <input type="text" id="pet-name" ref={this.petNameElRef}></input>
                            </div>
                            <div className="form-control">
                                <label htmlFor="pet-type">pet type</label>
                                <input type="text" id="pet-type" ref={this.petTypeElRef}></input>
                            </div>
                            <div className="form-control">
                                <label htmlFor="pet-weight">pet weight</label>
                                <input type="number" id="pet-weight" ref={this.petWeightElRef}></input>
                            </div>
                            <div className="form-control">
                                <label htmlFor="pet-weight">note</label>
                                <textarea type="text" row="4" id="note" ref={this.noteElRef}></textarea>
                            </div>
                            <button className="btn-confirm" onClick={this.confirmHandler}> Confirm Booking</button>
                            <button className="btn-confirm" type="reset" value="reset">Clear form</button>
                    </form>       
                        
                    </div>
                            
                </div>
               
            
          
            </React.Fragment>
        );
    }
}

export default addSingleBooking;