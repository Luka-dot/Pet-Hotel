import React from 'react';

import BookingItem from '../bookingItem';
import './bookingList.css';
// passing listed props to bookingItem.js
const bookingList = props => {
    const bookings = props.bookings.map(booking => {
        return <BookingItem    
                key={booking._id}
                customer={booking.customer}
                price={booking.price}   
                petName={booking.petName}          
                />;
        });
    return <ul className="booking__list">{bookings}</ul>
    };


export default bookingList;