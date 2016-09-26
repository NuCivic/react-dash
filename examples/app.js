import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { settings } from './settings';
import { Router, Route, browserHistory } from 'react-router';
import MyDashboard from './MyDashboard';
import CustomActionHandlers from './customActionHandlers';

// We extend the Dashboard so we can pass Routing info from the App
class Dashboard extends MyDashboard {
  render() {
    let z = {};
    z.appliedFilters = this.state.appliedFilters;
    const props = Object.assign({}, this.props, z, settings);
    return <MyDashboard {...props}/>
  }
}

// Wrap Dashboard component in router
class App extends Component {
  render() {
    return (
      <div id="router-container">
        <Router history={browserHistory}>
          <Route path='/' component={Dashboard} />
          <Route path='/react-dashboard' component={Dashboard} />
        </Router>
      </div>
    )
  }
}

// Now put it in the DOM!
document.addEventListener('DOMContentLoaded', function(event) {
  ReactDOM.render(<App/>, document.getElementById('root'));
});
