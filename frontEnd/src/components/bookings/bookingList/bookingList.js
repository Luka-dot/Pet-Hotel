import React from 'react';

import BookingItem from '../bookingItem';
import './bookingList.css';
// passing listed props to bookingItem.js
const bookingList = props => {
    const bookings = props.bookings.map(booking => {
        return <BookingItem
            key={booking._id}
            id={booking._id}
            customer={booking.customer}
            price={(booking.price).toFixed(2)}
            petName={booking.petName}
            checkIn={booking.checkIn}
            checkOut={booking.checkOut}
            petType={booking.petType}
            petWeight={booking.petWeight}
            note={booking.note}
            onDetail={props.onViewDetail}
        />;
    });
    return <React.Fragment><ul className="booking__list">{bookings}</ul></React.Fragment>
};


export default bookingList;