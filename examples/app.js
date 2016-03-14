import React, { Component } from 'react';
import {Dashboard, Geary, utils} from '../src/ReactDashboard';
import { datum } from './datum';
import { store } from './store';
import MyCustomLayout from './MyCustomLayout';
import AppContext from './AppContext';

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {data: datum};
  }

  onChange(value) {
    console.log(value);
  }

  render() {
    return (
      <div>
        <Dashboard context={new AppContext(this)} sharedState={this.state} {...store} layout={MyCustomLayout}/>
      </div>
    );
  }
}
