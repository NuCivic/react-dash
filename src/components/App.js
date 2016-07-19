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
import * as reducers from '../reducers';
/* dashboard app */
import Dashboard from './Dashboard';

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
  const _reducers = Object.assign(reducers, {settings:config, routing: routerReducer});
  const reducer = combineReducers(_reducers);

  // @@TODO we should pass the settings file to the store to hydrate the store
  const store = createStore(
    reducer,
    DevTools.instrument()
  )

  return React.createClass({
    render() {
      let props = this.props;
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
