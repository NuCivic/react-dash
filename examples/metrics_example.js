/**
 * This example shows how to build a basica dashboard using available components
 * and basic React JSX syntax.
 **/
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Dashboard, Card, Metric } from '../src/ReactDashboard';

class App extends Component {
  render() {
    return (
      <Dashboard 
        regions={[
          { children: 
            [
              <Metric 
                caption='Caption A'
                data={[1]}
                background='#687a99'
                iconClass='fa fa-bed'
              />,
              <Metric
                caption='Caption B'
                data={[2]}
                background='#689994'
                iconClass='fa fa-bomb'
              />,
              <Metric
                caption='Caption C'
                data={[3]}
                background='#8f6899'
                iconClass='fa fa-bathtub'
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
