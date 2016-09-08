import { Router, Route, browserHistory } from 'react-router';
import GADashboard from './GADashboard';
import React, { Component } from 'react';
import { settings } from './settings';
console.log('DD', GADashboard);


// Pass settings to dashboard here
const Dashboard = React.createClass({
  render() {
    return <GADashboard {...settings}/>
  }
})

// Wrap Dashboard component in router
export default class App extends Component {
  render() {
    return (
      <div id="router-container">
        <Router history={browserHistory}>
          <Route path='/' component={Dashboard} />
        </Router>
      </div>
    )
  }
}
