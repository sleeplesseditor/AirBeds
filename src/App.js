import React, { Component } from 'react';
import { DateRange, ReactiveBase } from '@appbaseio/reactivesearch';
import './App.css';

const credentials = require('./config').credentialsKey;

class App extends Component {
  render() {
    return (
      <div className="container">
        <ReactiveBase
          app="housing"
          credentials={credentials}
          type="listing"
          theme={{
            primaryColor: '#FF3A4E'
          }}
        >
          <nav className="nav">
            <div className="title">AirBeds</div>
          </nav>
          <div className="left-col">
            <DateRange 
              dataField="date_from"
              componentId="DateRangeSensor"
              title="When"
              numberOfMonths={1}
              queryFormat="basic_date"
            />
          </div>
        </ReactiveBase>
      </div>
    );
  }
}

export default App;
