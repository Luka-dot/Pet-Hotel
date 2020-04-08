import React from 'react';
import { Button, Sticky, Progress } from 'semantic-ui-react'
import ReactMinimalPieChart from 'react-minimal-pie-chart'
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
                <h4 id="capacity-label"><p>Capacity used:&nbsp;&nbsp;{totalCount}%</p></h4>
                <Progress id="progress-bar" percent={totalCount} indicating color='green' />
            </div>
            <h4><p>Total guests for this day:&nbsp;&nbsp;{bookings.length}</p> </h4>
            <h4 className="statusH4"><p>Daily average rate:&nbsp; ${(dayAveragePrice).toFixed(2)}&nbsp;</p>
                 <button className="report-btn" >Reports</button> </h4>
                 <ReactMinimalPieChart
            animate={false}
              cx={50}
              cy={50}
              data={[
            {
              color: '#2E8B57',
              title: 'One',
              value: `10`
            }, {
              color: '#98FB98',
              title: 'Two',
              value: `8` 
            }
            ]}
            label={false}
            labelPosition={50}
            lengthAngle={360}
            lineWidth={100}
            totalValue = {`20`}
            paddingAngle={0}
            radius={25}
            rounded={false}
            startAngle={100}
            style={{
              height: '75px',
              width: '75px'
            }}
            viewBoxSize={[
             25,
             25
            ]}
          />
            </div>
        </div>
    </Sticky>

};


export default status;
