import React from 'react';

import './render.css';

// props are passed from bookingList
const renderItem = props => (

    <li key={props.key} className={props.petWeight}>

        <div className="divTableRowS">
            <h3 className="divTableCellS">&nbsp;{props.petName}</h3>
            <div className="divTableRowS">
            <h4 id="hidePet">&nbsp; {props.petType}</h4>
            </div>
            
            
            </div>
        
    </li>

);

export default renderItem;


/*

<li key={props.key} className={props.petWeight}>

        <div className="divTableRowS">

            <h3 className="divTableCellS">&nbsp;{props.petName}</h3>
        </div>
        <div className="divTableRow2">
            <h4 className="divTableCellS">customer:&nbsp; {props.customer}</h4>
            <h4 className="divTableCellS">per night rate:&nbsp; {(props.price).toFixed(2)}</h4>
            <h4 className="divTableCellS">this guest is:&nbsp; {props.petType}</h4>
        </div>
        <div className="divTableRow2">
            <h5 className="divTableCellS">check-in:&nbsp; {props.checkIn}</h5>
            <h5 className="divTableCellS">check-out:&nbsp; {props.checkOut}</h5>
        </div>
    </li>

*/