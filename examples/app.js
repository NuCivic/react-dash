import React, { Component } from 'react';
import {Dashboard, Geary, utils} from '../src/ReactDashboard';
import { datum } from './datum';
import MyCustomLayout from './MyCustomLayout';
import AppStore from './AppStore';
import DashboardConstants from '../src/constants/DashboardConstants';

// This is the main application. Here we render the dashboard and suscribe to
// all the store events and change this view state accordingly.
export default class App extends Component {

  constructor(props) {
    super(props);

    // Let's set the initial state and populate the data array with
    // some dummy data.
    this.state = Object.assign({data: datum}, AppStore.getState());
  }

  componentWillMount() {

    // Suscribe to the STORE_CHANGE just before the component is mounted.
    AppStore.addChangeListener(DashboardConstants.STORE_CHANGE, this._storeChange.bind(this));
  }

  componentWillUnmount() {

    // If the component will be umounted then we remove the listener.
    AppStore.removeChangeListener(DashboardConstants.STORE_CHANGE, this._storeChange.bind(this));
  }

  _storeChange(){

    // Change the state when the STORE_CHANGE event happen.
    // this.setState change the state of the view and NOT the
    // store state. Because of the hierarchical nature of react
    // state is passed as props to the nested components.
    // Every time this state change all the dashboard is
    // rendered again.
    this.setState(AppStore.getState());
  }

  render() {
    return (
      <div>
        <Dashboard {...this.state} layout={MyCustomLayout}/>
      </div>
    );
  }
}
