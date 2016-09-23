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
    this.getData().then(data => {
      console.log(data);
    })
    return <p>foo</p>;
    //return <GADashboard {...props}/>
  }

  getData() {
		const url = 'http://dev-react-dashboard-demo.pantheonsite.io/api/action/datastore/search.json?resource_id=1899d41c-0715-46d4-9667-d6fd356c4a22&limit=5';
    return new Promise((resolve, reject) => {
      fetch(url).then(response => {
        return response.json();
      }).then(data => {
        resolve(data);
      }).catch(e => {
        reject(e);
      });
    });
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
          <Route path='/react-dashboard' component={Dashboard} />
        </Router>
      </div>
    )
  }
}
