import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { settings } from './settings';
import { Router, Route, browserHistory } from 'react-router';
import MyDashboard from './MyDashboard';

// We extend the Dashboard so we can pass Routing info from the App
class Dashboard extends MyDashboard {
  componentWillMount() {
    this.getData();
  }
  
  render() {
    const props = Object.assign({}, this.props, settings);
    return <MyDashboard {...props}/>
  }

  onAction(payload) {
    console.log('MyDash onAction', payload);
    // just run the action handlers
  }
}

// Wrap Dashboard component in router
class App extends Component {
  render() {
    console.log('render router', this);
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
