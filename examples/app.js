import React, { Component } from 'react';
import {Dashboard, Geary, utils} from '../src/ReactDashboard';
import { datum } from './datum';
import { store } from './store';
import MyCustomLayout from './MyCustomLayout';

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  onChange(value) {
    console.log(value);
  }

  getContext() {
    return {
      getData: (data) => datum,
      getCSVData: (data) => console.log(data),
      onAutocompleteChange: (value) => console.log(value),
      getTableData: () => {
        return [
          {
            a1: 'a2',
            b1: 'b2',
            c1: 'c2',
          },
          {
            a1: 'a3',
            b1: 'b3',
            c1: 'c3',
          }
        ];
      }
    }
  }

  render() {
    return (
      <div>
        <Dashboard context={this.getContext()} sharedState={this.state} {...store} layout={MyCustomLayout}/>
      </div>
    );
  }
}
