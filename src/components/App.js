import React, { Component } from 'react';
import Registry from '../utils/Registry';
import Dashboard from './Dashboard';
import { Router, Route, Link, browserHistory } from 'react-router';
import {set} from 'lodash';
/* devtools */
import { createDevTools } from 'redux-devtools';
import LogMonitor from 'redux-devtools-log-monitor';
import DockMonitor from 'redux-devtools-dock-monitor';
/* redux */
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';
import { routerMiddleware, push } from 'react-router-redux';


/****
 * Reducers
 ****/
export function filterParams(state = {}, action) {
  if (action.type === 'update_filter') {
    const newFilters = set({}, [action.el, action.filterId]);
    newFilters[action.el][action.filterId] = action.vals;
    console.log('update_filter', newFilters);
    return Object.assign({}, state, newFilters);
  } else {
    return state;
  } 
}

/****
 * Actions
 ****/

/*
 * @@STUB
 * @@ How do we get settings? 
 * @@ How do we move enough of this to the /examples folder
 * @@ so we can pull in the settings file
 * Import settings to the store
 * @param settings {object} - the dashboard settings object
 */
export function reduceSettings(settings) {
  // @@TODO any logic necessary to import settings
  return Object.assign({},settings())
}

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
export default function (settings) {

const reducer = combineReducers({
  filterParams, // => { ... }
  function () {return settings}, // inject settings
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
