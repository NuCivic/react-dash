import React, { Component } from 'react';
import Registry from '../utils/Registry';
import Dashboard from './Dashboard';
import { Router, Route, Link, browserHistory } from 'react-router'

export default class App extends Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    let props = this.props;
    return (
      <Router history={browserHistory} >
        <Route path="/" component={Dashboard} {...props} />
      </Router>   
    )
  }
}

Registry.set('App', App);
