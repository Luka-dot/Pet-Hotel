import React, { Component } from 'react'

const render = props => {
    const bookings = props.status.bookings.map(booking => {
        return booking.petWeight        
        });
        console.log('inside render ', bookings)
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
        console.log('medium pet count ', mediumPet)
       let totalCount = 0;
        const calculateSpace = () => {
            totalCount = Math.ceil((100/960) * ((smallPet * 40) + (mediumPet * 60) + (largePet * 80)));
            return totalCount
        }
        calculateSpace()

        // 
        



    return <div className="status-display">
                <h1>This is where wil render lay-out go</h1>
                <div id="wrapper">
                <h4 id="capacity-label"><p>capacity used:&nbsp;&nbsp;{totalCount}%</p></h4>
                </div>
                
                
            </div>
         
        
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
    */