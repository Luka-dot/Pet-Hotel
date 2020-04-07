import React, { Component } from 'react'
import RenderItem from './renderItem';

const render = props => {

    // sorting logic, sorting by size and calculating volume of the space needed for assignment.
    let leftCount = 0;
    let leftSideBookings = [];
    let rightSideBookings = [];
    // first sorting by size of the animal
    props.renderStatus.sort(compare);

    props.renderStatus.map(element => {
        if (element.petWeight == "large" && leftCount <= 10) {
            leftCount = leftCount + 2;
            leftSideBookings.push(element);
        } else if (element.petWeight == "medium" && leftCount <= 10.5) {
            leftCount = leftCount +1.5;
            leftSideBookings.push(element);
        } else if (element.petWeight == "small" && leftCount <= 11) {
            leftCount = leftCount +1;
            leftSideBookings.push(element);
        } else {
            rightSideBookings.push(element);
        }
    })
  
    // need sort arrays by petWeight so it will be rendered next to each other in single array
    function compare(a, b) {
        const bandA = a.petWeight.toUpperCase();
        const bandB = b.petWeight.toUpperCase();
      
        let comparison = 0;
        if (bandA > bandB) {
          comparison = 1;
        } else if (bandA < bandB) {
          comparison = -1;
        }
        return comparison * 1;
      }

      leftSideBookings.sort(compare)
      rightSideBookings.sort(compare)
      
      console.log(leftSideBookings.sort(compare));

    // 3 variables each holding pets with proper size
        let smallPetCount = 0;
        let mediumPetCount = 0;
        let largePetCount = 0;
        // map bookings and push pets to appropriate array
        const countPetsBySize = () => props.renderStatus.map(booking =>{
            if (booking.petWeight == 'small' ) {
                smallPetCount ++
            } else if ( booking.petWeight == 'large' ) {
                largePetCount ++
            } else {
                mediumPetCount ++
            }
        });
        countPetsBySize();
        // day format modification
        let day= new Date(props.currentDay);
        let days = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];
        let today = days[day.getDay() ];
        // calculate remaining space for different sizes of kennels 
        let remainingSpaceCount = 24;
        const remainingSpace = () => {
           remainingSpaceCount = ((remainingSpaceCount - smallPetCount) - (mediumPetCount * 1.5) - (largePetCount * 2) );
        } 
        remainingSpace()

        let smallRemaining = Math.floor(remainingSpaceCount);
        let mediumRemaining = Math.floor(remainingSpaceCount / 1.5);
        let largeRemaining = Math.floor(remainingSpaceCount / 2);
        console.log(largeRemaining)

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
                <div className="setupinfo"><h3 className="setUpHeader">Layout for&nbsp; {today}&nbsp; will require:</h3>
                <div ><h3 className="setUpH3">small kennels&nbsp;({smallPetCount}),&nbsp;&nbsp;&nbsp;&nbsp;
                        medium kennels&nbsp;({mediumPetCount}), &nbsp;&nbsp;&nbsp;&nbsp;
                        large kennels&nbsp;&nbsp;({largePetCount}) </h3> 
                </div>
                <div>&nbsp;</div>
                <div><h4 className="setUpH32">Available space for:&nbsp;
                &nbsp;small kennels ({smallRemaining}), or&nbsp;
                         medium kennels ({mediumRemaining}), or&nbsp; 
                        large kennels ({largeRemaining})
                        </h4> 
                    </div>
                </div>
                <div className="renderdiv2">
                    <div className="small-render-list">{bookingsLeft}</div>
                    <div className="small-render-list-middle"></div>
                    <div className="small-render-list-left">{bookingsRight}</div>
                    </div>
                </React.Fragment>    
};

    export default render;
