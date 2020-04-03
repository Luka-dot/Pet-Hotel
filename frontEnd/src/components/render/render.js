import React, { Component } from 'react'
import RenderItem from './renderItem';

const render = props => {
    const bookings = props.renderStatus.map(booking => {
            return <RenderItem    
                    key={booking._id}
                    customer={booking.customer}
                    price={booking.price}   
                    petName={booking.petName} 
                    checkIn={booking.checkIn}
                    checkOut={booking.checkOut}
                    petType={booking.petType}
                    petWeight={booking.petWeight}
                    note={booking.note}         
                    />;
            });
        return <React.Fragment><ul className="small-render-list">{bookings}</ul></React.Fragment>
        



        
    };

    export default render;


    /*
<h4><p>We have&nbsp; {bookings.length}&nbsp;&nbsp;guests for this day.</p> </h4>
                <h4><p>Daily average rate is:&nbsp; {dayAveragePrice}&nbsp;$</p> </h4>



                // lets figure out 3 variables, each holding pets with proper size
        // let smallPetArr = [];
        // let mediumPetArr = [];
        // let largePetArr = [];
        // // map bookings and push pets to appropriate array
        // const sortPetsBySize = () => props.status.map(booking =>{
        //     if (booking.petWeight < 21 ) {
        //         smallPetArr.push(booking)
        //     } else if ( booking.petWeight >= 70 ) {
        //         largePetArr.push(booking)
        //     } else {
        //         mediumPetArr.push(booking)
        //     }
        // });
        // sortPetsBySize();


        
    return <div className="status-display">
                <h1>This is where wil render lay-out go</h1>
                <div id="wrapper">
                <h4 id="capacity-label"><p>capacity used:&nbsp;&nbsp;{totalCount}%</p></h4>
                </div>
                
                
            </div>
         
    */