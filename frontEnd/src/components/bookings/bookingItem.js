import React from 'react';

import './bookingItem.css';
// props are passed from bookingList
const bookingItem = props => (
  <li key={props.key} className="bookings__list-item">
    <h3>customer : {props.customer}</h3> 
     <div> 
        <h4>pet name : {props.petName}</h4>
        <h4>price : {props.price}</h4>
        <h4>check-in : {new Date(props.checkIn).toLocaleDateString()}</h4>
    </div>
    </li>
    
);

export default bookingItem;