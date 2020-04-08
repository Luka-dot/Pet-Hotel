import React from 'react';
import { Redirect, Link } from "react-router-dom";

import './chartModal.css';
import LineDemo from '../chart/chart';

const graphModal = props => (
  <div className="graphModal">
    <h1>Last 6 months data </h1>

  <LineDemo
    
    width={80}
    height={30}
    options={{ maintainAspectRatio: false }}
  />

    <button className="btnChart" onClick={props.chartSwitch}>Close</button>
  </div>
);


export default graphModal;
