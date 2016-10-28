import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { settings } from './settings';
import { Router, Route, browserHistory } from 'react-router';
import { Dashboard } from '../src/ReactDashboard';

let _settings = settings;
let url = 'https://gist.githubusercontent.com/starsinmypockets/f6395260c464b4ab49ed552532020c27/raw';

// We extend the Dashboard so we can pass Routing info from the App
class MyDashboard extends Component {
  render() {
    let z = {};
    z.appliedFilters = (this.state) ? this.state.appliedFiltersi : {};
    const props = Object.assign({}, this.props, z, _settings);
    return <Dashboard {...props}/>
  }
}

// Wrap Dashboard component in router
class App extends Component {
  render() {
    return (
      <div id="router-container">
        <Router history={browserHistory}>
          <Route path='/' component={MyDashboard} />
          <Route path='/react-dashboard' component={MyDashboard} />
        </Router>
      </div>
    )
  }
}

// Now put it in the DOM!
document.addEventListener('DOMContentLoaded', function(event) {
  console.log('DOM -0'); 
  fetch(url).then(res => {
    return res.json();
  }).then(json => {
    console.log("GIST", json);
    // now fetch functions
    _settings = json;
    ReactDOM.render(<App/>, document.getElementById('root'));
  });
});
