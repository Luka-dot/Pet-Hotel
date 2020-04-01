import React, { Component } from 'react';
import './mainView.css';

class MainView extends Component {
    render() {
        return(
            <div>
                <h1> MAIN PAGE </h1>
                <div className="maindiv">
                <div className="renderdiv">this will be floor plan render</div>
                <div className="bookingsdiv">this will be right side app render
                <div className="status">this will be status component</div>
                <button> Add Booking</button>
                <div className="bookingsRender">this where bookings will be rendered</div>
                </div>
                </div>
            </div>
        );
    }
}

export default MainView;