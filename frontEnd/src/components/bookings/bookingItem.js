import React from 'react';

import './bookingItem.css';
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

export default bookingItem;

/*  import './bookingItem.css';
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