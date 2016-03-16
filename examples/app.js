import React, { Component } from 'react';
import {Dashboard, Geary, utils} from '../src/ReactDashboard';
import { datum } from './datum';
import MyCustomLayout from './MyCustomLayout';
import AppContext from './AppContext';
import DashboardStore from './DashboardStore';
import DashboardConstants from '../src/constants';

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = Object.assign({data: datum}, DashboardStore.getState());
  }

  componentDidMount() {
    DashboardStore.addChangeListener(DashboardConstants.DATA_LOADED, this._autocompleteChange);
  }

  componentWillUnmount() {
    DashboardStore.removeChangeListener(DashboardConstants.DATA_LOADED, this._autocompleteChange);
  }

  _autocompleteChange(){
    console.log(this.state.data);
  }

  render() {
    return (
      <div>
        <Dashboard context={new AppContext(this)} {...this.state} layout={MyCustomLayout}/>
      </div>
    );
  }
}
