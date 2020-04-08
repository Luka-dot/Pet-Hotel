import React from 'react';

import './bookingItem.css';
// props are passed from bookingList
const bookingItem = props => (

    <li key={props.key} className="divTable">    
        <div className="divTableBody">
        <div className="divTableRow">
            <h3 className="divTableCell">&nbsp;{props.petName}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</h3>
            <h4 className="divTableCell"></h4>  
            <h3 className="divTableCell" ></h3>                    
            <h3 className="divTableCell"><a className="inner-text"></a>&nbsp; {props.price}</h3>
        </div>
        <div className="divTableRow">
            <h5 className="divTableCell">&nbsp; {props.customer}</h5>
            <h3 className="divTableCell" id="petType">{props.petType}&nbsp; </h3>
            <h4 className="divTableCell">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</h4>
            <button className="divTableCell" id="deletebtn" onClick={props.onDetail.bind(props.id)} value={props.id}>Delete</button>
    
        </div>
        <div className="divTableRow3">
            <h3 className="divTableCell">&nbsp; {props.checkIn}</h3>
            <h4 className="divTableCell"></h4>
            <h3 className="divTableCell">to&nbsp;&nbsp;&nbsp;{props.checkOut}</h3>
            <h4 className="divTableCell">&nbsp;&nbsp;&nbsp;&nbsp;</h4>
            
        </div>
    </div>
    
    </li>

);

export default bookingItem;