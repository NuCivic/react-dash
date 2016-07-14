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

/*
 * APP FACTORY
 * @param settings {object} the settings file for your dashboard
 * @return App {react class} The Application element, with config state represented in redux store
 */
export default function (settings) {
  const DevTools = createDevTools(
    <DockMonitor toggleVisibilityKey="ctrl-h" changePositionKey="ctrl-q">
      <LogMonitor theme="tomorrow" preserveScrollTop={false} />
    </DockMonitor>
  )

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
