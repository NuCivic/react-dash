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
export function filterReducer(state = {}, action) {
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

const reducer = combineReducers({
  filterReducer,
  routing: routerReducer
})

const middleware = routerMiddleware(browserHistory)
const store = createStore(
  reducer,
  DevTools.instrument(),
  applyMiddleware(middleware)
)

export default class App extends Component {
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
}

Registry.set('App', App);
