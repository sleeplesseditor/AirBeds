import React, { Component } from 'react';
import { DateRange, DataSearch, NumberBox, RangeSlider, ReactiveBase, ResultCard } from '@appbaseio/reactivesearch';
import './App.css';

const credentials = require('./config').credentialsKey;

class App extends Component {
  render() {
    return (
      <div className="container">
        <ReactiveBase
          app="airbeds-test-app"
          credentials={credentials}
          theme={{
            primaryColor: '#FF3A4E'
          }}
        >
          <nav className="nav">
            <div className="title">AirBeds</div>
            <DataSearch
              componentId="SearchSensor"
              dataField="name"
              autosuggest={false}
              placeholder="Search by house names"
              iconPosition="left"
              className="search"
              highlight={true}
            />
          </nav>
          
          <div className="left-col">
            <DateRange 
              dataField="date_from"
              componentId="DateRangeSensor"
              title="When"
              numberOfMonths={1}
              queryFormat="basic_date"
              initialMonth={new Date('04-01-2017')}
            />
            <NumberBox
              componentId="GuestSensor"
              dataField="accommodates"
              title="Guests"
              defaultSelected={2}
              labelPosition="right"
              data={{
                start: 1,
                end: 16,
              }}
            />
            <RangeSlider
              componentId="PriceSensor"
              dataField="price"
              title="Price Range"
              range={{
                  start: 10,
                  end: 250
              }}
              rangeLabels={{
                  start: "$10",
                  end: "$250"
              }}
              defaultSelected={{
                  start: 10,
                  end: 50
              }}
              stepValue={10}
              react={{
                  and: ["DateRangeSensor"]
              }}
            />
          </div>

          <ResultCard 
            className="right-col"
            componentId="SearchResult"
            dataField="name"
            size={12}
            onData={data => ({
                image: data.image,
                title: data.name,
                description: (
                    <div>
                        <div className="price">${data.price}</div>
                        <p className="info">{data.room_type} · {data.accommodates} guests</p>
                    </div>
                ),
                url: data.listing_url,
            })}
            pagination
            react={{
                and: ['SearchSensor', 'GuestSensor', 'PriceSensor', 'DateRangeSensor', 'search'],
            }}
            innerClass={{
              resultStats: 'result-stats',
              list: 'list',
              listItem: 'list-item',
              image: 'image',
            }}
          />
        </ReactiveBase>
      </div>
    );
  }
}

export default App;
