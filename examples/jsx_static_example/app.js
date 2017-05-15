/**
 * This example shows how to build a basic dashboard using available components
 * and basic React JSX syntax.
 *
 **/

/**
 * Import the required elements
 **/
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Dashboard, Region, Card, Metric, Chart } from '../../src/ReactDashboard';


/**
 * Extend the application and provide a render method
 **/
class App extends Component {
  render() {
    return (

    /**
    * Use the Dashboard component to wrap your
    * dashboard elements
    **/
    <Dashboard title="A Simple Dashboard Writ in JSX" doFilterRouting={false}>
      <link rel="stylesheet" type="text/css" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" />
      
      <div className="row">
        <Metric 
          caption='Caption A'
          data={[1]}
          background='#687a99'
          cardClasses={['col-md-4']}
          iconClass='fa fa-bed'
        />
        <Metric
          caption='Caption B'
          data={[2]}
          background='#689994'
          cardClasses={['col-md-4']}
          iconClass='fa fa-bomb'
        />
        <Metric
          caption='Caption C'
          data={[3]}
          background='#8f6899'
          cardClasses={['col-md-4']}
          iconClass='fa fa-bathtub'
        />
      </div>
      <div className="row">
        <Chart 
          header="Header 1"
          iconClass="fa fa-cloud"
          cardClasses={['col-md-6']}
          key="chart1"
          data={[{x: 'foo', y: 10}, {x: 'bar', y: 20}, {x: 'bax', y: 30}]}
          settings={
            {
              type: 'pieChart',
              height: 300
            }
          }
        />
        <Chart 
          header="Header 2"
          iconClass="fa fa-cogs"
          cardClasses={['col-md-6']}
          key="chart2"
          data={[{x: 'Eeny', y: 1122}, {x: 'Meeny', y: 2220}, {x: 'Miney', y: 910}]}
          settings={
            {
              type: 'pieChart',
              height: 300,
            }
          }
        />
      </div>
    </Dashboard>
    )
  }
}

document.addEventListener('DOMContentLoaded', function(event) {
    ReactDOM.render(<App/>, document.getElementById('root'));
});
