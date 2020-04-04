import React, { Component } from 'react'
import RenderItem from './renderItem';

const render = props => {

    // sorting logic, sorting by size and calculating volume of the space needed for assignment.
    let leftCount = 0;
    let leftSideBookings = [];
    let rightSideBookings = [];

    props.renderStatus.map(element => {
        if (element.petWeight == "small" && leftCount < 11) {
            leftCount = leftCount +1;
            leftSideBookings.push(element);
        } else if (element.petWeight == "medium" && leftCount < 10.5) {
            leftCount = leftCount +1.5;
            leftSideBookings.push(element);
        } else if (element.petWeight == "large" && leftCount < 10) {
            leftCount = leftCount + 2;
            leftSideBookings.push(element);
        } else {
            rightSideBookings.push(element);
        }
    })
    console.log('count ', leftCount)
    console.log('Arrays ', leftSideBookings , rightSideBookings)

    const bookingsLeft = leftSideBookings.map(booking => {
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

    const bookingsRight = rightSideBookings.map(booking => {
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

        return <React.Fragment>
                <div className="renderdiv2">
                    <div className="small-render-list">{bookingsLeft}</div>
                    <div className="small-render-list-middle">middle</div>
                    <div className="small-render-list-left">{bookingsRight}</div>
                    </div>
                </React.Fragment>    
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