/**
 * This example shows how to build a basic dashboard using available components
 * and basic React JSX syntax.
 **/
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Dashboard, Region, Card, Metric, Chart } from '../../src/ReactDashboard';

class App extends Component {
  render() {
    return (
   <Dashboard title="A Frivolous Dashboard Writ in JSX" doFilterRouting={false}>
      <link rel="stylesheet" type="text/css" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" />
      <div className="row">
        <Card cardStyle="metric" className="col-md-4">
          <Metric 
            caption='Caption A'
            data={[1]}
            background='#687a99'
            iconClass='fa fa-bed'
          />
        </Card>
        <Card cardStyle="metric" className="col-md-4">
          <Metric
            caption='Caption B'
            data={[2]}
            background='#689994'
            iconClass='fa fa-bomb'
          />
        </Card>
        <Card cardStyle="metric" className="col-md-4">
          <Metric
            caption='Caption C'
            data={[3]}
            background='#8f6899'
            iconClass='fa fa-bathtub'
          />
        </Card>
      </div>
      <div className="row">
        <Card cardStyle="chart" className="col-md-6">
          <Chart 
            header="Foo"
            iconClass="fa fa-cloud"
            key="chart1"
            data={[{x: 'foo', y: 10}, {x: 'bar', y: 20}, {x: 'bax', y: 30}]}
            settings={
              {
                type: 'pieChart',
                height: 300
              }
            }
          />
        </Card>
        <Card cardStyle="chart" className="col-md-6">
          <Chart 
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
        </Card>
        </div>
    </Dashboard>
    )
  }
}

document.addEventListener('DOMContentLoaded', function(event) {
    ReactDOM.render(<App/>, document.getElementById('root'));
});
