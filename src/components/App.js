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
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';


/****
 * Reducers
 ****/
function filterReducer(state = {}, action) {
  console.log('fR', state, action);
  if (action.type === 'update_filter') {
    const newFilters = set({}, [action.el, action.filterId]);
    newFilters[action.el][action.filterId] = action.vals;
    return Object.assign(state, newFilters);
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
 * @param filter.scope {string} elementID/filterID or global
 * @param filter.vals {} values to assign to scope filter
 */
function updateFilter(filter) {
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
  function () {return {a:'b'}},
  filterReducer,
  routing: routerReducer
})

const store = createStore(
  reducer,
  DevTools.instrument()
)

store.dispatch(updateFilter({
  type: 'update_filter',
  el: 'el1',
  filterId: 'f1',
  vals: [1234, 'col_name', 'foo']
}));

store.dispatch(updateFilter({
  type: 'update_filter',
  el: 'el2',
  filterId: 'f1',
  vals: ['909']
}));

store.dispatch(updateFilter({
  type: 'update_filter',
  el: 'el1',
  filterId: 'f1',
  vals: ['1234','col_name','bar']
}));

export default class App extends Component {
  constructor(props) {
    super(props);
  }
  
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
