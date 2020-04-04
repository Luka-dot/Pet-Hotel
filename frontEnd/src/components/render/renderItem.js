import React from 'react';

import './render.css';

// props are passed from bookingList
const renderItem = props => (

    <li key={props.key} className={props.petWeight}>


        <div className="divTableRowS">

            <h4 className="divTableCellS">pet name: &nbsp;{props.petName}</h4>
        </div>
        <div className="divTableRow2">
            <h4 className="divTableCellS">customer:&nbsp; {props.customer}</h4>
            <h4 className="divTableCellS">per night rate:&nbsp; {props.price}</h4>
            <h4 className="divTableCellS">this guest is:&nbsp; {props.petType}</h4>
        </div>
        <div className="divTableRow2">
            <h5 className="divTableCellS">check-in:&nbsp; {props.checkIn}</h5>
            <h5 className="divTableCellS">check-out:&nbsp; {props.checkOut}</h5>
        </div>


    </li>

);

export default renderItem;

/*
<li key={props.key} className="divTableS">

    <div className="divTableBodyS">
    <div className="divTableRowS">

    <h4 className="divTableCellS">pet name: &nbsp;{props.petName}</h4>
</div>
<div className="divTableRow2">
    <h4 className="divTableCellS">customer:&nbsp; {props.customer}</h4>
    <h4 className="divTableCellS">per night rate:&nbsp; {props.price}</h4>
    <h4 className="divTableCellS">this guest is:&nbsp; {props.petType}</h4>
</div>
<div className="divTableRow2">
    <h5 className="divTableCellS">check-in:&nbsp; {props.checkIn}</h5>
    <h5 className="divTableCellS">check-out:&nbsp; {props.checkOut}</h5>
</div>
</div>

</li>

*/