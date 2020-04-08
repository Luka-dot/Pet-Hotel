import React, {Component} from 'react';
import { Line } from 'react-chartjs-2';

const data = {
    labels: ['October', 'November', 'December', 'January', 'February', 'March'],
    datasets: [
      {
        label: 'Occupancy rate %',
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(75,192,192,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: [ 59, 80, 81, 78, 65, 77],
        maintainAspectRatio: false
      },
      {
        label: 'Average rate per day $',
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'rgba(184.0, 32.0, 128.0, 1.0)',
        borderColor: 'rgba(184.0, 32.0, 128.0, 1.0)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(184.0, 32.0, 128.0, 1.0)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(184.0, 32.0, 128.0, 1.0)',
        pointHoverBorderColor: 'rgba(184.0, 32.0, 128.0, 1.0)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: [ 70, 65, 75, 78, 65, 73],
        maintainAspectRatio: false
      }
    ]
  };
  
  export default class LineDemo extends Component {
    render() {
      return (
        <div className="chartHolder">
          <Line ref="chart" data={data} />
        </div>
      );
    }
  
    componentDidMount() {
      const { datasets } = this.refs.chart.chartInstance.data
      console.log(datasets[0].data);
    }
  }


/*

render() {
        console.log(this.state.num_completed)
        return (
        <div>
        
        <ReactMinimalPieChart
            animate={false}
              cx={50}
              cy={50}
              data={[
            {
              color: '#2E8B57',
              title: 'One',
              value: `${this.state.num_completed}`
            }, {
              color: '#98FB98',
              title: 'Two',
              value: `${this.state.num_tasks - this.state.num_completed}` 
            }
            ]}
            label={false}
            labelPosition={50}
            lengthAngle={360}
            lineWidth={100}
            totalValue = {`${this.state.num_tasks}`}
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

          <h5>{this.state.num_completed}/{this.state.num_tasks}</h5>
          </div>
        )
    }
*/