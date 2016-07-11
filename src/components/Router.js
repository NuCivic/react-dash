import React, { Component } from 'react';
import Registry from '../utils/Registry';
import Dashboard from './Dashboard';
import { Router as _Router, Route, Link, browserHistory } from 'react-router'

export default class Router extends Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    let props = this.props;
    return (
      <_Router history={browserHistory} >
        <Route path="/" component={Dashboard} {...props} />
      </_Router>   
    )
  }
}

Registry.set('Router', Router);
