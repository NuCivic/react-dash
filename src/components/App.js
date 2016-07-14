/* react */
import React, { Component } from 'react';
import { Router, Route, Link, browserHistory } from 'react-router';
/* devtools */
import { createDevTools } from 'redux-devtools';
import LogMonitor from 'redux-devtools-log-monitor';
import DockMonitor from 'redux-devtools-dock-monitor';
/* redux */
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';
import { routerMiddleware, push } from 'react-router-redux';
/* dashboard app */
import Dashboard from './Dashboard';
import * as reducers from '../reducers';
/* util */
import {set} from 'lodash';

/****
 * Actions
 ****/

/*
 * Update App Filters
 * Replace filters for Component/Filter with passed filter values
 * Replace global filters with passed filter values
 *
 * @param filter.el {string} elementID/filterID or 'global'
 * @param filter.filterId {string} id of el's filter
 * @param filter.vals {} values to assign to scope filter
 */
export function updateFilter(filter) {
  console.log('filter act called', filter);
  // @@TODO when filters are update we should update the 
  return {
    type: 'update_filter',
    el: filter.el,
    filterId: filter.filterId,
    vals: filter.vals
  } 
}

 /* 
 * App
 */
const DevTools = createDevTools(
  <DockMonitor toggleVisibilityKey="ctrl-h" changePositionKey="ctrl-q">
    <LogMonitor theme="tomorrow" preserveScrollTop={false} />
  </DockMonitor>
)

/*
 * APP FACTORY
 * @param settings {object} the settings file for your dashboard
 * @return App {react class} The Application element, with config state represented in redux store
 */
export default function (settings) {
  function config() {
    return settings;
  }
  
  const reducer = combineReducers({
    reducers,
    config,
    routing: routerReducer // => { ...  }
  })

  // @@TODO we should pass the settings file to the store to hydrate the store
  const middleware = routerMiddleware(browserHistory)
  const store = createStore(
    reducer,
    DevTools.instrument(),
    applyMiddleware(middleware)
  )

  return React.createClass({
    render() {
      let props = this.props;
      console.log('app', this, store);	
      return (
        <Provider store={store}>
          <div>
              <Router history={browserHistory} >
                <Route path="/" component={Dashboard} {...props} />
              </Router>
            <DevTools />
          </div>
        </Provider>
      )
    }
  })
} 
