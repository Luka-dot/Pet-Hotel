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

/*  this guest is:&nbsp; {props.petType}
<li key={props.key} className="divTable"> 
   
    <div className="divTableBody">
    <div className="divTableRow">
    <h4 className="divTableCell">customer:&nbsp; {props.customer}</h4>
    <h4 className="divTableCell">pet name: &nbsp;{props.petName}</h4>
</div>
<div className="divTableRow">
    <h4 className="divTableCell">price:&nbsp; {props.price}</h4>
    <h4 className="divTableCell">check-in:&nbsp; {props.checkIn}</h4>
</div>
</div>
    
  </li>


<div class="divTable" style="width: 100%;border: 1px solid #000;" >
    <div class="divTableBody">
    <div class="divTableRow">
    <div class="divTableCell">1&nbsp;</div>
    <div class="divTableCell">2&nbsp;</div>
</div>
<div class="divTableRow">
    <div class="divTableCell">3&nbsp;</div>
    <div class="divTableCell">4&nbsp;</div>
</div>
</div>
</div>


.bookings__list-item {
  
  display: flex;
  width: 100%;
  height: 90px;
  background: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  margin-top: 2vh;
  }
  
  .bookings__list-item p {
      margin: 0;
  }
  .booking__list_second {
    
    margin-left: 2vh;
  }
  #wrapper {
  display: flex;
   
}
#customer {
  display: inline-block;
  width: 50%;
  height: 3vh;
  border: 1px solid green;
  
}
#pet {
  margin-top: 0vh;
  width: 50%;
  height: 3vh;
  border: 1px solid green;
  float: right;
}



*/