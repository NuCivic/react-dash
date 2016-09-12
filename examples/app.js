import { Router, Route, browserHistory } from 'react-router';
import GADashboard from './GADashboard';
import React, { Component } from 'react';
import { settings } from './settings';
console.log('DD', GADashboard);


// Pass settings to dashboard here
class Dashboard extends Component {
  constructor (props) {
    super(props);
    console.log('superclass', this);
  }
  
  render() {
    // add router-provided props to our config settings
    const props = Object.assign({}, this.props, settings);
    return <GADashboard {...props}/>
  }
}

// Wrap Dashboard component in router
export default class App extends Component {
  render() {
    console.log('render router', this);
    return (
      <div id="router-container">
        <Router history={browserHistory}>
          <Route path='/' component={Dashboard} />
        </Router>
      </div>
    )
  }
}
