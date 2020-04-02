import React from 'react';

const status = props => {
    const bookings = props.status.map(booking => {
        return booking.petWeight        
        });
        console.log('inside status ', bookings)
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
       console.log('pets ', smallPet, largePet, mediumPet)
       let totalCount = 0;
        const calculateSpace = () => {
            totalCount = Math.ceil((100/960) * ((smallPet * 40) + (mediumPet * 60) + (largePet * 80)));

            return totalCount
        }
        calculateSpace()
        console.log(Math.ceil(totalCount))

    return <div className="booking__list">
            <h1>Status details</h1>
            <h4>capacity used :&nbsp;&nbsp;{totalCount}%</h4>
            <h4>We have&nbsp;&nbsp; {bookings.length}&nbsp;&nbsp;guests </h4>
    
    </div>
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