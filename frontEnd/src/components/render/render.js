import React, { Component } from 'react'

const render = props => {
    const bookings = props.status.map(booking => {
        return booking.petWeight        
        });
        console.log('inside render ', bookings)
        let smallPet = 0;
        let mediumPet = 0;
        let largePet = 0;
        bookings.forEach(element => {
            if (element <= 20) {
                smallPet ++
            } else if (element >20 && element<50) {
                mediumPet ++
            } else if (element >= 50) {
                largePet ++
            }
        });

       let totalCount = 0;
        const calculateSpace = () => {
            totalCount = Math.ceil((100/960) * ((smallPet * 40) + (mediumPet * 60) + (largePet * 80)));
            return totalCount
        }
        calculateSpace()

        // lets figure out 3 variables, each holding pets with proper size
        let smallPetArr = [];
        let mediumPetArr = [];
        let largePetArr = [];
        // map bookings and push pets to appropriate array
        const sortPetsBySize = () => props.status.map(booking =>{
            if (booking.petWeight < 21 ) {
                smallPetArr.push(booking)
            } else if (booking.petWeigh >20 && booking.petWeight < 50) {
                mediumPetArr.push(booking)
            } else if ( booking.petWeight >= 50 ) {
                largePetArr.push(booking)
            }
        });
        sortPetsBySize();
        
        console.log('sm ', smallPetArr);
        console.log('m ',mediumPetArr)
        console.log('lg ',largePetArr)

      
        // const allDayPrice = props.status.map(price => {
        //     return price.price
        // })
        // console.log('price: ',allDayPrice)
        // let totalPrice = 0;
        // allDayPrice.forEach(element => {
        //     totalPrice = totalPrice + element
        //     return totalPrice
        // })
        // let numberOfBookings = bookings.length
        // let dayAveragePrice = Math.ceil((totalPrice / numberOfBookings));



    return <div className="status-display">
                <h1>Status details</h1>
                <div id="wrapper">
                <h4 id="capacity-label"><p>capacity used:&nbsp;&nbsp;{totalCount}%</p></h4>
                </div>
                
                
            </div>
         
        
    };

    export default render;


    /*
<h4><p>We have&nbsp; {bookings.length}&nbsp;&nbsp;guests for this day.</p> </h4>
                <h4><p>Daily average rate is:&nbsp; {dayAveragePrice}&nbsp;$</p> </h4>

    */