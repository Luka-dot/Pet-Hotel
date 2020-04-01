import React, { Component } from 'react';

import BookingList from '../components/bookings/bookingList/bookingList';
import Spinner from '../components/spinner/spinner';
import AuthContext from '../context/auth-context';
import './booking.css';

class Booking extends Component {
    state = {

    };

    constructor(props) {
        super(props);
        this.customerElRef = React.createRef();
        this.checkInElRef = React.createRef();
        this.checkOutElRef = React.createRef();
        this.priceElRef = React.createRef();
        this.petNameElRef = React.createRef();
        this.petTypeElRef = React.createRef();
        this.petWeightElRef = React.createRef();
        this.noteElRef = React.createRef();
    }

    componentDidMount() {
        
      }
    
    confirmHandler = (e) => {
        e.preventDefault()
        const customer = this.customerElRef.current.value;
        const checkIn = this.checkInElRef.current.value;
        const checkOut = this.checkOutElRef.current.value;
        const price = this.priceElRef.current.value;
        const date = new Date();
        const petName = this.petNameElRef.current.value;
        const petType = this.petTypeElRef.current.value;
        const petWeight = this.petWeightElRef.current.value;
        const note = this.noteElRef.current.value;
        // add validation here if enough time
        const booking = {customer, checkIn, checkOut, price, date, petName, petType, petWeight, note};
        console.log('checking if booking was created ', booking)
    }


    render() {
        return (
            <div>
                <h1> BOOKING PAGE </h1>
                <div className="maindiv">
                    <div className="renderdiv">this will be floor plan render</div>
                    <div className="bookingsdiv">this will be right side app render
                <div className="status">this will be status component</div>
                        
                        <div className="bookingsRender">
                    <div className="form-control">
                        
                    <form>
                        <button onClick={this.confirmHandler}> Confirm Booking</button>
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
                    </form>       
                        
                    </div>
                            <button>Clear form</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Booking;


                    