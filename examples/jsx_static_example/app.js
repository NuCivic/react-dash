/**
 * This example shows how to build a basic dashboard using available components
 * and basic React JSX syntax.
 **/
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Dashboard, Card, Metric, Chart } from '../../src/ReactDashboard';

class App extends Component {
  render() {
    return (
   <Dashboard 
        title="A Frivolous Dashboard Writ in JSX"
        regions={[
          // First Region
          { className: 'row',
            children:
            [
              <Metric 
                caption='Caption A'
                cardStyle="metric"
                className="col-md-4"
                data={[1]}
                background='#687a99'
                iconClass='fa fa-bed'
              />,
              <Metric
                caption='Caption B'
                cardStyle="metric"
                className="col-md-4"
                data={[2]}
                background='#689994'
                iconClass='fa fa-bomb'
              />,
              <Metric
                caption='Caption C'
                cardStyle="metric"
                className="col-md-4"
                data={[3]}
                background='#8f6899'
                iconClass='fa fa-bathtub'
              />
            ]
          }, 
          // Second Region
          {
            className: 'row',
            children: [
              <Chart 
                cardStyle="chart"
                header="Foo"
                iconClass="fa fa-cloud"
                className="col-md-6"
                key="chart1"
                data={[{x: 'foo', y: 10}, {x: 'bar', y: 20}, {x: 'bax', y: 30}]}
                settings={
                  {
                    type: 'pieChart',
                    height: 300
                  }
                }
              />,
              <Chart 
                cardStyle="chart"
                className="col-md-6"
                header="Eeny"
                iconClass="fa fa-cogs"
                key="chart2"
                data={[{x: 'Eeny', y: 1122}, {x: 'Meeny', y: 2220}, {x: 'Miney', y: 910}]}
                settings={
                  {
                    type: 'pieChart',
                    height: 300,
                  }
                }
              />
            ]
          }
        ]}
      />
    )
  }
}

document.addEventListener('DOMContentLoaded', function(event) {
    ReactDOM.render(<App/>, document.getElementById('root'));
});
