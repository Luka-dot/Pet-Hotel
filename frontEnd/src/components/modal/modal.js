import React from 'react';
import { Redirect, Link } from "react-router-dom";

import './modal.css';
import Booking from '../../pages/booking';

const modal = props => (
    <div className="modal">
      <h1>Booking was created</h1>
      
      {props.canCancel && (
        <Link to='/mainview'><button className="btn-modal" onClick={props.onCancel}>
          Back to Main View
        </button></Link>
      )}
    </div>
  );
  
  export default modal;