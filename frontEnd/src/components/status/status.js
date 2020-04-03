import React from 'react';
import { Button, Sticky, Progress } from 'semantic-ui-react'
import './status.css';

const status = props => {
    const bookings = props.status.map(booking => {
        return booking.petWeight        
        });
        
        let smallPet = 0;
        let mediumPet = 0;
        let largePet = 0;
        bookings.forEach(element => {
            if (element <= 20) {
                smallPet ++
            } else if (element >20 && element<70) {
                mediumPet ++
            } else if (element >= 70) {
                largePet ++
            }
        });

       let totalCount = 0;
        const calculateSpace = () => {
            totalCount = Math.ceil((100/960) * ((smallPet * 40) + (mediumPet * 60) + (largePet * 80)));
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
               
                <h1>Status details</h1>
                <div id="wrapper">
                <h4 id="capacity-label"><p>capacity used:&nbsp;&nbsp;{totalCount}%</p></h4>
                <Progress id="progress-bar" percent={totalCount} indicating color='green' />
                </div>
                <h4><p>We have&nbsp; {bookings.length}&nbsp;&nbsp;guests for this day.</p> </h4>
                <h4><p>Daily average rate is:&nbsp; {dayAveragePrice}&nbsp;$</p> </h4>
                
            </div>
        </Sticky>  
        
    };


export default status;


// const smallPet = bookings.filter(function(num) {
//     return num.petWeight <= 20;
// })
// const mediumPet = bookings.filter(function(num) {
//     return num.petWeight > 20 && num.petWeight <50;
// })
// const largePet = bookings.filter(function(num) {
//     return num.petWeight >= 50;
// })