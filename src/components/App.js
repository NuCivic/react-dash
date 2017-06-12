import React, { Component } from 'react';
import { Router, Route, browserHistory } from 'react-router';
import Registry from '../utils/Registry';
import Dashboard from './Dashboard';

export default class App extends Component {
  render() {
    const props = this.props;
    return (
      <Router history={browserHistory} >
        <Route path="/" component={Dashboard} {...props} />
      </Router>
    );
  }
}

Registry.set('App', App);
