import React from 'react';
import { Button, Sticky, Progress } from 'semantic-ui-react'
import './status.css';

const status = props => {
    const bookings = props.status.map(booking => {
        return booking.petWeight
    });
    // calculating usage of the floor-room based on size of the pet
    let smallPet = 0;
    let mediumPet = 0;
    let largePet = 0;
    bookings.forEach(element => {
        if (element == "small") {
            smallPet++
        } else if (element == "medium") {
            mediumPet++
        } else if (element == "large") {
            largePet++
        }
    });

    let totalCount = 0;
    const calculateSpace = () => {
        totalCount = Math.ceil((100 / 960) * ((smallPet * 40) + (mediumPet * 60) + (largePet * 80)));
        return totalCount
    }
    calculateSpace()
    
    const allDayPrice = props.status.map(price => {
        return price.price
    })

    let totalPrice = 0;
    allDayPrice.forEach(element => {
        totalPrice = totalPrice + element
        return totalPrice
    })
    let numberOfBookings = bookings.length
    let dayAveragePrice = Math.ceil((totalPrice / numberOfBookings));

    return <Sticky>
        <div className="status-display">
            <div className="col">
            <h1>Status details</h1>
            <div id="wrapper">
                <h4 id="capacity-label"><p>capacity used:&nbsp;&nbsp;{totalCount}%</p></h4>
                <Progress id="progress-bar" percent={totalCount} indicating color='green' />
            </div>
            <h4><p>We have&nbsp; {bookings.length}&nbsp;&nbsp;guests for this day.</p> </h4>
            <h4><p>Daily average rate is:&nbsp; {dayAveragePrice}&nbsp;$</p> </h4>
            </div>
        </div>
    </Sticky>

};


export default status;
