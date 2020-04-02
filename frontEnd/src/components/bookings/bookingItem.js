import React from 'react';

import './bookingItem.css';
// props are passed from bookingList
const bookingItem = props => (
  <li key={props.key} className="bookings__list-item">
    <div> 
    <h3>customer : {props.customer}</h3> 
    <h4>pet name : {props.petName}</h4>
    </div>
    <div className="booking__list_second">
        <h4>price : {props.price}</h4>
        <h4>check-in : {props.checkIn}</h4>
    </div>
    </li>
    
);

export default bookingItem;