import React from 'react';

import './bookingItem.css';
// props are passed from bookingList
const bookingItem = props => (

    <li key={props.key} className="divTable">
        
     
        <div className="divTableBody">
            <div className="divTableRow">
                <h3 className="divTableCell"><a className="inner-text">customer:</a>&nbsp; {props.customer}</h3>
                <h3 className="divTableCell"><a className="inner-text">pet name:</a> &nbsp;{props.petName}</h3>
            </div>
            <div className="divTableRow">
                <h3 className="divTableCell"><a className="inner-text">per night rate:</a>&nbsp; {props.price}&nbsp;$</h3>
                <h3 className="divTableCell"><a className="inner-text">this guest is:</a>&nbsp; {props.petType}</h3>
            </div>
            <div className="divTableRow2">
                <h5 className="divTableCell">check-in:&nbsp; {props.checkIn}</h5>
                <h5 className="divTableCell">check-out:&nbsp; {props.checkOut}</h5>
            </div>
            <div className="divTableRow2">
                <h5 className="divTableCell">note:&nbsp; {props.note}</h5>
                <button className="divTableCell" onClick={props.onDetail.bind(props.id)} value={props.id}>Cancel Booking</button>
            </div>
        </div>
    
    </li>

);

export default bookingItem;

/*  import './bookingItem.css';


onClick={props.onDelete.bind(this, booking._id)}


// props are passed from bookingList
const bookingItem = props => (
  <li key={props.key} className="divTable">

    <div className="divTableBody">
    <div className="divTableRow">
    <h4 className="divTableCell">customer:&nbsp; {props.customer}</h4>
    <h4 className="divTableCell">pet name: &nbsp;{props.petName}</h4>
</div>
<div className="divTableRow">
    <h4 className="divTableCell">per night rate:&nbsp; {props.price}</h4>
    <h4 className="divTableCell">this guest is:&nbsp; {props.petType}</h4>
</div>
<div className="divTableRow2">
    <h5 className="divTableCell">check-in:&nbsp; {props.checkIn}</h5>
    <h5 className="divTableCell">check-out:&nbsp; {props.checkOut}</h5>
</div>
</div>

</li>

);



*/