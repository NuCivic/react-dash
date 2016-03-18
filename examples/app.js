import React, { Component } from 'react';
import {Dashboard, Geary, utils} from '../src/ReactDashboard';
import { datum } from './datum';
import MyCustomLayout from './MyCustomLayout';
import AppStore from './AppStore';
import DashboardConstants from '../src/constants';

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = Object.assign({data: datum}, AppStore.getState());
  }

  componentWillMount() {
    AppStore.addChangeListener(DashboardConstants.STORE_CHANGE, this._storeChange.bind(this));
  }

  componentWillUnmount() {
    AppStore.removeChangeListener(DashboardConstants.STORE_CHANGE, this._storeChange.bind(this));
  }

  _storeChange(){
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
