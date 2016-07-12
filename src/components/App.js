import React, { Component } from 'react';
import Registry from '../utils/Registry';
import Dashboard from './Dashboard';
import { Router, Route, Link, browserHistory } from 'react-router';
/* devtools */
import { createDevTools } from 'redux-devtools';
import LogMonitor from 'redux-devtools-log-monitor';
import DockMonitor from 'redux-devtools-dock-monitor';
/* redux */
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import * as reducers from '../reducers';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';

const DevTools = createDevTools(
  <DockMonitor toggleVisibilityKey="ctrl-h" changePositionKey="ctrl-q">
    <LogMonitor theme="tomorrow" preserveScrollTop={false} />
  </DockMonitor>
)

const reducer = combineReducers({
 reducers,
  routing: routerReducer
})

const store = createStore(
  reducer,
  DevTools.instrument()
)

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
